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

module.exports = {
    formataPayload
};