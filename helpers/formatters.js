const {
    formataDataPadraoBR
} = require('./validators');

function formataPayload (data) {
    const ponto = require('../config/payload.json');
    ponto.proposal.date = data;
    ponto.proposal.times_attributes = ponto.proposal.times_attributes.map(time => {
        const newtime = time;
        newtime.date = data;

        return newtime
    });
    ponto._path = ponto._path.replace('[#DATA-ISO-BR#]', formataDataPadraoBR(data));

    return ponto;
}

const formatNumberWith2Digits = (number) => number < 10 ? `0${number}` : number;

module.exports = {
    formataPayload,
    formatNumberWith2Digits
};