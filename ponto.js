// Requires
const fetch = require('node-fetch');
const ehDiaUtil = require('eh-dia-util');

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
    const dataInicial = new Date(parseInicio[0], parseInicio[1] -1 , parseInicio[2]);
    const dataFinal = new Date(parseFim[0], parseFim[1] - 1, parseFim[2]);

    let dataCorrente = dataInicial;

    while (dataCorrente <= dataFinal) {
        if (ehDiaUtil(dataCorrente)) {
            disparaPonto([dataCorrente.getFullYear(), dataCorrente.getMonth() + 1, dataCorrente.getDate()].join('-'));
            // console.log(dataCorrente.getFullYear(), dataCorrente.getMonth() + 1, dataCorrente.getDate());
        }

        dataCorrente.setTime( dataCorrente.getTime() + 1 * 86400000 );
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