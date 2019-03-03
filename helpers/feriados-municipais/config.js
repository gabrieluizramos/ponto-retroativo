const calendarioConfig = require('../../config/calendario.json');

const DOMINIO_API = calendarioConfig.url;
const TOKEN = `token=${process.env.token || calendarioConfig.token}`;
const CIDADE = `cidade=${process.env.cidade || calendarioConfig.cidade}`;
const ESTADO = `estado=${process.env.estado || calendarioConfig.estado}`;
const ANO = ano => `ano=${ano || new Date().getFullYear()}`;

const API = ano => `${DOMINIO_API}?${ANO(ano)}&${ESTADO}&${CIDADE}&${TOKEN}`;

module.exports = API;
