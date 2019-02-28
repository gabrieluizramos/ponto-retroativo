const fetch = require('node-fetch');
const parser = require('xml2json');

// Config
const getApiURL = require('./config');

const {formatDateToBr} = require('../formatters');

async function ehDiaUtilMunicipal(data) {
    const dataObj = new Date(data);
    const ano = dataObj.getFullYear();
    const API = getApiURL(ano);
 
    const dataPadraoBr = formatDateToBr(data);

    const response = await fetch(API);
    const responseText = await response.text();
    const JSONdata = JSON.parse(parser.toJson(responseText));
    const feriadosMunicipais = JSONdata.events.event;

    const ehFeriadoMunicipal = feriadosMunicipais.some(evento => evento.date === dataPadraoBr);
    
    return ehFeriadoMunicipal;
}

module.exports = ehDiaUtilMunicipal;