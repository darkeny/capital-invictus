const CalculationOfFines = (start: Date, end: Date) => {
    const msPerDay = 1000 * 60 * 60 * 24;
    const startDate = start.getTime();  // Obter milissegundos do início
    const endDate = end.getTime();      // Obter milissegundos do fim
    return Math.ceil((endDate - startDate) / msPerDay);
};

export {CalculationOfFines}