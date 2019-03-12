const fetch = require('node-fetch');
const parser = require('xml2json');

// Config
const getApiURL = require('./config');

const {formatDateToBr} = require('../formatters');

const feriados = {};

const anoFoiConsultado = ano => Object.keys(feriados).includes(ano.toString());

async function consultaFeriadoMunicipal (ano) {
    const API = getApiURL(ano);
    const response = await fetch(API);
    const responseText = await response.text();
    const JSONdata = JSON.parse(parser.toJson(responseText));
    const feriadosMunicipais = JSONdata.events.event;
    
    feriados[ano] = feriadosMunicipais;

    return feriados[ano]
}

async function ehDiaUtilMunicipal(data) {
    const dataObj = new Date(data);
    const ano = dataObj.getFullYear();
    const dataPadraoBr = formatDateToBr(data);

    const _feriados = !anoFoiConsultado(ano) ? await consultaFeriadoMunicipal(ano) : feriados[ano];

    const ehFeriadoMunicipal = _feriados.some(evento => evento.date === dataPadraoBr);
    
    return ehFeriadoMunicipal;
}

module.exports = ehDiaUtilMunicipal;