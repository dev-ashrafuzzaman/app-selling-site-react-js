import { useEffect, useRef, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import usePendingWithdraw from "../../../hooks/usePendingWithdraw";
import TablePagination from "../../../utils/Table/TablePagination";
import { ToastContainer } from "react-toastify";
import WithdrawTable from "../../../components/Table/WithdrawTable";
import TableLoad from "../../../components/Table/TableLoad";
import TableTopSearch from "../../../utils/Table/TableTopSearch";
import SectionTitle from "../../../components/SectionTitle";
import { HandleWithdrawStatus } from "../../../utils/WebUsers/HandleWithdrawStatus";

const PendingWithdraw = () => {
    const [axiosSecure] = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { isPendingWithdraw, refetch, isPendingWithdrawLoading } = usePendingWithdraw(currentPage, pageSize, searchQuery);
    const [totalCount, setTotalCount] = useState(0);
    const totalPages = Math.ceil(totalCount / pageSize);

    
    const modalRef = useRef(null);
    const [modalData, setModalData] = useState(null);
    const [statusValue, setStatusValue] = useState()
    const showModal = (data) => {
        setModalData(data);
        setStatusValue(data?.status)
        modalRef.current.showModal();
    };
    
    const handleChange = (event) => {
        setStatusValue(event.target.value);
    };


    useEffect(() => {
        if (isPendingWithdraw) {
            setTotalCount(isPendingWithdraw?.totalCount);
        }
    }, [isPendingWithdraw]);

    return (
        <div className='px-8'>
            <SectionTitle heading={'Manage Pending Withdraw'}></SectionTitle>

            {/* Search Page Select and Refresh Section*/}
            <TableTopSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} refetch={refetch}></TableTopSearch>

            {/* Table Section With Pagination */}
            <div>
                <div className="overflow-x-auto bg-white p-6 rounded-2xl">
                    <table className="table">
                        <thead className='font-bold text-black text-sm'>
                            <tr>
                                <th className='border-b-2 border-black'>#</th>
                                <th className='border-b-2 border-black '>User Info</th>
                                <th className='border-b-2 border-black '>Withdraw Info</th>
                                <th className='border-b-2 border-black'>Amounts</th>
                                <th className='border-b-2 border-black'>Status</th>
                                <th className='border-b-2 border-black'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isPendingWithdrawLoading && <TableLoad></TableLoad>
                            }
                            {
                                isPendingWithdraw?.data?.map((customer, index) => <WithdrawTable
                                    key={customer._id}
                                    data={customer}
                                    sl={index}
                                    refetch={refetch}
                                    axiosSecure={axiosSecure}
                                    global={isPendingWithdraw.global}
                                    user={isPendingWithdraw?.users?.find(user => user.email == customer.uid)}
                                    showModal={showModal}
                                ></WithdrawTable>)
                            }
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <TablePagination setCurrentPage={setCurrentPage} refetch={refetch} searchQuery={searchQuery} totalPages={totalPages} currentPage={currentPage} pageSize={pageSize} totalCount={totalCount} setPageSize={setPageSize}></TablePagination>
            </div>
            <ToastContainer></ToastContainer>
            <dialog id="withdrawStatus" ref={modalRef} className="modal">
                <div className="modal-box">
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-error text-white absolute right-2 top-2">✕</button>
                        </form>
                    </div>
                    <h3 className="font-bold text-lg text-center my-5">Withdraw Status Change</h3>
                    <label className="input input-bordered flex items-center gap-2 my-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input type="text" readOnly className="grow" defaultValue={modalData?.uid} placeholder="Email" />
                    </label>
                    <select className="select select-bordered w-full" value={statusValue} onChange={handleChange}>
                        <option disabled value={statusValue} hidden>{statusValue}</option>
                        <option value="Approved">Approved</option>
                        <option value="Rejected">Rejected</option>
                    </select>
                    <button onClick={() => HandleWithdrawStatus(axiosSecure, refetch, modalData, statusValue, modalRef)} className='btn btn-error text-white my-2 w-full'>Status Change</button>
                </div>
            </dialog>
        </div>
    );
};

export default PendingWithdraw;