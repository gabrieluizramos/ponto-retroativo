const ehDiaUtil = require('eh-dia-util');
const ehFeriadoMunicipal = require('./feriados-municipais');

async function verificaDiaUtil(data) {
    const diaUtil = ehDiaUtil(data);
    const feriadoMunicial = await ehFeriadoMunicipal(data);
    
    return diaUtil && !feriadoMunicial;
}

module.exports = verificaDiaUtil;