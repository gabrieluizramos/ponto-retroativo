const formataDataPadraoBR = data => data.split('-').reverse().join('-');

const dataEhValida = (inicio, fim) => {
    const parsedInicio = inicio.split('-');
    const parsedFim = fim.split('-');

    const dataInicial = new Date(parsedInicio[0], parsedInicio[1] -1 , parsedInicio[2]);
    const dataFinal = new Date(parsedFim[0], parsedFim[1] - 1, parsedFim[2]);
    const inicioMenorIgualFim = dataInicial <= dataFinal;

    const inicioFormatoCorreto = Number(parsedInicio[0]) && parsedInicio[0].length == 4 && Number(parsedInicio[1]) && parsedInicio[1].length == 2 && Number(parsedInicio[2]) && parsedInicio[2].length == 2;
    const fimFormatoCorreto = Number(parsedFim[0]) && parsedFim[0].length == 4 && Number(parsedFim[1]) && parsedFim[1].length == 2 && Number(parsedFim[2]) && parsedFim[2].length == 2;

    return inicioMenorIgualFim && inicioFormatoCorreto && fimFormatoCorreto;
};

module.exports = {
    dataEhValida,
    formataDataPadraoBR
};
