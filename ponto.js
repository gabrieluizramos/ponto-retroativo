const fetch = require('node-fetch');
const userConfig = require('./userConfig.json');
const {url} = require('./api.json');

const formataDataPadraoBR = data => data.split('-').reverse().join('-');
const dataEhValida = (inicio, fim) => {
    const parsedInicio = inicio.split('-');
    const parsedFim = fim.split('-');

    const mesesIguais = parsedInicio[1] === parsedFim[1];
    const inicioFormatoCorreto = Number(parsedInicio[0]) && parsedInicio[0].length == 4 && Number(parsedInicio[1]) && parsedInicio[1].length == 2 && Number(parsedInicio[2]) && parsedInicio[2].length == 2;
    const fimFormatoCorreto = Number(parsedFim[0]) && parsedFim[0].length == 4 && Number(parsedFim[1]) && parsedFim[1].length == 2 && Number(parsedFim[2]) && parsedFim[2].length == 2;

    return mesesIguais && inicioFormatoCorreto && fimFormatoCorreto;
};

function formataPayload (data) {
    const ponto = require('./payload');
    ponto.proposal.date = data;
    ponto.proposal.times_attributes = ponto.proposal.times_attributes.map(time => {
        const newtime = time;
        newtime.date = data;

        return newtime
    });
    ponto._path = ponto._path.replace('[#DATA-ISO-BR#]', formataDataPadraoBR(data));

    return ponto;
}

function disparaPonto (data) {
    const payload = formataPayload(data);

    fetch(url, {
        method: 'POST',
        headers: userConfig,
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