const {
    formataDataPadraoBR
} = require('./validators');

const pathTemplate = '/meu_ponto/[#DATA-ISO-BR#]/nova_proposta';

module.exports = function(data, horarios) {
    const result = {
        proposal: {
            motive: "Ajuste retroativo",
            times_attributes: [
            //     {
            //         "date": "2018-09-25",
            //         "time": "08:00",
            //         "edited": true
            //     }
            ],
            proposal_type: 1
        },
        _device: {
            manufacturer: null,
            model: null,
            uuid: null,
            version: null
        },
        _appVersion: "0.10.30"
    }

    result.proposal.date = data;
    result.proposal.times_attributes = horarios.map(horario => ({
        date: data,
        time: horario,
        edited: true
    }));
    result._path = pathTemplate.replace('[#DATA-ISO-BR#]', formataDataPadraoBR(data));


    return result;
}