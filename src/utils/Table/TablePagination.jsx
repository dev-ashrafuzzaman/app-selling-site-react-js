import { handlePageChange, handlePageSizeChange } from "./TableUtils";

const TablePagination = ({ totalPages, currentPage, pageSize, totalCount, refetch, setCurrentPage, searchQuery, setPageSize }) => {

    return (
        <div className='md:flex justify-between items-center my-4'>
            <div className="md:block hidden">Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} entries</div>
            <div className="join ">
                <button onClick={() => handlePageChange(currentPage - 1, setCurrentPage, refetch, pageSize, searchQuery)} disabled={currentPage === 1} className="join-item btn md:btn-sm btn-xs" >« Previous</button>
                {/* <div className="join">
                    {[...Array(totalPages).keys()].map(page => (
                        <input
                            key={page}
                            type="radio"
                            name="options" aria-label={page + 1}
                            className={`btn join-item md:btn-sm btn-xs btn-square ${currentPage === page + 1 ? 'active' : ''}`}
                            onClick={() => handlePageChange(page + 1 , setCurrentPage ,refetch, pageSize, searchQuery)}
                            defaultChecked={currentPage === page + 1}
                            value={page + 1}
                        />


                    ))}
                </div> */}
                <button onClick={() => handlePageChange(currentPage + 1, setCurrentPage ,refetch, pageSize, searchQuery)} disabled={currentPage === totalPages} className="join-item btn md:btn-sm btn-xs">Next »</button>
                <div className="join-item btn md:btn-sm btn-xs">
                    <span>Items per page:</span>
                    <select value={pageSize} onChange={(event) => handlePageSizeChange(event, searchQuery, setPageSize, setCurrentPage, refetch)}>
                        <option value={10}>10</option>
                        <option value={50}>50</option>
                        <option value={100}>100</option>
                        <option value={200}>200</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default TablePagination;


