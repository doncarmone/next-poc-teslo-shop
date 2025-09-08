

export const generatePaginationNumbers = (currentPage: number, totalPages: number) => {
    if (totalPages <= 7) {
        return Array.from({ length: totalPages }, (_, i) => i + 1);
    };

    //Si la pagina actual es en la primeera 1 pagina
    //Mostrar las primeras 3 paginas, los 3 puntos y la ultima pagina
    if (currentPage <= 3) {
        return [1, 2, 3, 4, '...', totalPages - 1, totalPages];
    }
    //Si la pagina actual es en las ultimas 3 paginas
    if (currentPage >= totalPages - 2) {
        return [1, 2, '...', totalPages - 2, totalPages - 1, totalPages];
    }
    //Si la pagina actual esta otro lugar medio
    return [1, '...', currentPage - 1, currentPage, currentPage + 1, '...', totalPages];
}