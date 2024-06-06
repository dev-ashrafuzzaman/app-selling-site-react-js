export const pageSizeOptions = [10, 50, 100, 200];

export const handlePageChange = (page, setCurrentPage, refetch, pageSize, searchQuery) => {
    setCurrentPage(page);
    refetch({ page, pageSize, searchQuery });
};

export const handlePageSizeChange = (e, searchQuery, setPageSize, setCurrentPage, refetch) => {
    setPageSize(parseInt(e.target.value));
    setCurrentPage(1);
    refetch({ page: 1, pageSize: parseInt(e.target.value), searchQuery });
};