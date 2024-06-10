import { handlePageChange, handlePageSizeChange } from "./HandleChange";

const Pagination = ({ totalPages, currentPage, pageSize, totalCount, refetch, setCurrentPage, searchQuery, setPageSize }) => {
    return (
        <div className='flex justify-between items-center my-4'>
        <div className="">Showing {(currentPage - 1) * pageSize + 1} to {Math.min(currentPage * pageSize, totalCount)} of {totalCount} entries</div>
        <div className="flex justify-center items-center">
            <button onClick={() => handlePageChange(currentPage - 1, setCurrentPage, refetch, pageSize, searchQuery)} disabled={currentPage === 1} className="btn-xs bg-primary text-white px-1  h-[30px] border-e-2" >« Previous</button>
            <div className="">
                {[...Array(totalPages).keys()].map(page => (
                    <input
                        key={page}
                        type="radio"
                        name="options" aria-label={page + 1}
                        className={`btn  md:btn-sm btn-xs btn-square ${currentPage === page + 1 ? 'active' : ''}`}
                        onClick={() => handlePageChange(page + 1 , setCurrentPage ,refetch, pageSize, searchQuery)}
                        defaultChecked={currentPage === page + 1}
                        value={page + 1}
                    />


                ))}
            </div>
            <button onClick={() => handlePageChange(currentPage + 1, setCurrentPage ,refetch, pageSize, searchQuery)} disabled={currentPage === totalPages} className="btn-xs bg-primary text-white px-1  h-[30px]">Next »</button>
            <div className="">
                <select className="h-[30px] text-xs" value={pageSize} onChange={(event) => handlePageSizeChange(event, searchQuery, setPageSize, setCurrentPage, refetch)}>
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

export default Pagination;