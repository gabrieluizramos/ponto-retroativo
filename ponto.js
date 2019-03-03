// Requires
const fetch = require('node-fetch');
const delorean = require('@gabrieluizramos/delorean-js');

// Config
const user = require('./config/user.json');
const {url} = require('./config/api.json');
const messages = require('./config/messages.json');

// Helpers
const {dataEhValida} = require('./helpers/validators');
const {formataPayload, formateDateToISO} = require('./helpers/formatters');
const ehDiaUtil = require('./helpers/eh-dia-util');


function disparaPonto (data) {
    fetch(url, {
        method: 'POST',
        headers: user,
        body: JSON.stringify(formataPayload(data))
    })
    .then(res => console.log(messages.saving.success.replace('[#data#]', data), res))
    .catch(err => console.log(messages.saving.failure));
}

async function corrigePonto(inicio, fim) {
    const parseInicio = inicio.split('-');
    const parseFim = fim.split('-');
    const dataInicial = new Date(parseInicio[0], parseInicio[1] -1 , parseInicio[2]);
    const dataFinal = new Date(parseFim[0], parseFim[1] - 1, parseFim[2]);

    let dataCorrente = dataInicial;

    while (dataCorrente <= dataFinal) {
        const formattedDate = formateDateToISO(dataCorrente);
        const weekday = delorean.setDate(formattedDate).getWeekDay('long');
        const deveCorrigirPonto = await ehDiaUtil(dataCorrente); 

        if (deveCorrigirPonto) {
            disparaPonto(formattedDate);
        }
        else {
            console.log(messages.notWorkingDay.replace('[#data#]', formattedDate).replace('[#dia-da-semana#]', weekday));
        }

        dataCorrente.setTime( dataCorrente.getTime() + 1 * 86400000 );
    }
}

function tamoAquiNaRetroatividade({inicio, fim}) {
    if (inicio.trim() && fim.trim() && dataEhValida(inicio, fim)) {
        corrigePonto(inicio, fim);
    }
    else {
        console.log(messages.invalidDate);
    }
}

module.exports = tamoAquiNaRetroatividade;