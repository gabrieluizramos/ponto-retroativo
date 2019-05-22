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


function disparaPonto (data, random) {
    fetch(url, {
        method: 'POST',
        headers: user,
        body: JSON.stringify(formataPayload(data, random))
    })
    .then(res => res.json())
    .then(res => {
        if(!res.errors) {
            console.log(messages.saving.success.replace('[#data#]', data));
            console.log(res);
        } else {
            console.log(messages.saving.warning.replace('[#data#]', data));
            console.log(res.errors);
        }
    })
    .catch(err => console.log(messages.saving.failure))
    .then(() => console.log(messages.separator));
}

async function corrigePonto(inicio, fim, random) {
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
            disparaPonto(formattedDate, random);
        }
        else {
            console.log(messages.notWorkingDay.replace('[#data#]', formattedDate).replace('[#dia-da-semana#]', weekday));
        }

        dataCorrente.setTime( dataCorrente.getTime() + 1 * 86400000 );
    }
}

function tamoAquiNaRetroatividade({inicio, fim, random}) {
    if (inicio.trim() && fim.trim() && dataEhValida(inicio, fim)) {
        corrigePonto(inicio, fim, random);
    }
    else {
        console.log(messages.invalidDate);
    }
}

module.exports = tamoAquiNaRetroatividade;