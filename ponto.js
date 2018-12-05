// Requires
const fetch = require('node-fetch');

// Config
const user = require('./config/user.json');
const {url} = require('./config/api.json');

// Helpers
const {dataEhValida} = require('./helpers/validators');
const {formataPayload} = require('./helpers/formatters');


function disparaPonto (data) {
    const payload = formataPayload(data);

    fetch(url, {
        method: 'POST',
        headers: user,
        body: JSON.stringify(payload)
    })
    .then(data => console.log('cadastrado com sucesso', data))
    .catch(err => console.log('erro ao cadastar'));
}

function corrigePonto(inicio, fim) {
    const parseInicio = inicio.split('-');
    const parseFim = fim.split('-');
    const dataInicial = Number(parseInicio[2]);
    const dataFinal = Number(parseFim[2]);

    const qtdDias = dataFinal - dataInicial;

    for (let dia = 0; dia <= qtdDias; dia++) {
        const dataDisparo = parseInicio
        dataDisparo[2] = Number(dataInicial) + dia;
        disparaPonto(dataDisparo.join('-'));
    } 
}

function tamoAquiNaRetroatividade({inicio, fim}) {
    if (inicio.trim() && fim.trim() && dataEhValida(inicio, fim)) {
        corrigePonto(inicio, fim);
    }
    else {
        console.log('Data invalida');
    }
}

module.exports = tamoAquiNaRetroatividade;