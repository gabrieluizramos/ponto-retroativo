const DOMINIO_API = 'https://api.calendario.com.br/';
const TOKEN = `token=${process.env.token || 'Z2FicmllbC5sdWl6LnJhbW9zQGdtYWlsLmNvbSZoYXNoPTIyMzMyMTE1OQ'}`;
const CIDADE = `cidade=${process.env.cidade || 'SAO_PAULO'}`;
const ESTADO = `estado=${process.env.estado || 'SP'}`;
const ANO = ano => `ano=${ano || new Date().getFullYear()}`;

const API = ano => `${DOMINIO_API}?${ANO(ano)}&${ESTADO}&${CIDADE}&${TOKEN}`;

module.exports = API;
