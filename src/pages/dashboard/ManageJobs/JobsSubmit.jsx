import { useEffect, useRef, useState } from "react";
import JobSubmitTable from "../../../components/Table/JobSubmitTable";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import useJobSubmit from "../../../hooks/useJobSubmit";
import TableTopSearch from "../../../utils/Table/TableTopSearch";
import TablePagination from "../../../utils/Table/TablePagination";
import { ToastContainer } from "react-toastify";
import SectionTitle from "../../../components/SectionTitle";
import { HandleJobSubmitStatus } from "../../../utils/WebUsers/HandleJobSubmitStatus";

const JobsSubmit = () => {
    const [axiosSecure] = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { isJobsSubmit, refetch } = useJobSubmit(currentPage, pageSize, searchQuery);

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
        if (isJobsSubmit) {
            setTotalCount(isJobsSubmit?.totalCount);
        }
    }, [isJobsSubmit]);

    const modalRef1 = useRef(null);
    const [modalData1, setModalData1] = useState(null);
    const showModal1 = (data, id) => {
        setModalData1({ data, id });
        modalRef1.current.showModal();
    };
    return (
        <>
            <div className="px-8">
                <SectionTitle heading={'Manage Jobs Submit'}></SectionTitle>
                {/* Search Page Select and Refresh Section*/}
                <TableTopSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} refetch={refetch}></TableTopSearch>
                <div className="w-full my-4 drop-shadow-xl bg-white rounded-2xl md:p-10 p-4">

                    <div className="overflow-x-auto bg-white p-6 rounded-2xl">
                        <table className="table">
                            <thead className='font-bold text-black'>
                                <tr>
                                    <th className='border-b-2 border-black'>#</th>
                                    <th className='border-b-2 border-black '>Visit Time</th>
                                    <th className='border-b-2 border-black '>Submit Time 1</th>
                                    <th className='border-b-2 border-black w-16'>Prof 1</th>
                                    <th className='border-b-2 border-black'>Submit Time2</th>
                                    <th className='border-b-2 border-black w-16'>Prof 2</th>
                                    <th className='border-b-2 border-black '>Status</th>
                                    <th className='border-b-2 border-black'>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    isJobsSubmit?.data?.map((withdraw, index) => <JobSubmitTable
                                        key={withdraw._id}
                                        data={withdraw}
                                        sl={index}
                                        refetch={refetch}
                                        axiosSecure={axiosSecure}
                                        showModal1={showModal1}
                                        showModal={showModal}
                                    ></JobSubmitTable>)
                                }
                            </tbody>
                        </table>
                    </div>
                    {/* Pagination */}
                    <TablePagination setCurrentPage={setCurrentPage} refetch={refetch} searchQuery={searchQuery} totalPages={totalPages} currentPage={currentPage} pageSize={pageSize} totalCount={totalCount} setPageSize={setPageSize}></TablePagination>
                </div>
                <dialog id="my_modal_2" ref={modalRef1} className="modal ">
                    <div className="modal-box">
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-error text-white absolute right-2 top-2">✕</button>
                            </form>
                        </div>
                        <h3 className="font-bold text-lg text-center my-5">Prof Image</h3>
                        {
                            modalData1?.id == 'p1' ? <>
                                <img src={`${import.meta.env.VITE_BASE_URL}${modalData1?.data?.prof1}`} alt="" />
                            </> : modalData1?.id == 'p2' ?
                                <>
                                    <img src={`${import.meta.env.VITE_BASE_URL}${modalData1?.data?.prof2}`} alt="" />
                                </> : <>
                                    <img src={`${import.meta.env.VITE_BASE_URL}${modalData1?.data?.prof}`} alt="" />
                                </>
                        }
                    </div>
                </dialog>
                <ToastContainer></ToastContainer>
                <dialog id="withdrawStatus" ref={modalRef} className="modal">
                    <div className="modal-box">
                        <div className="modal-action">
                            <form method="dialog">
                                {/* if there is a button in form, it will close the modal */}
                                <button className="btn btn-sm btn-circle btn-error text-white absolute right-2 top-2">✕</button>
                            </form>
                        </div>
                        <h3 className="font-bold text-lg text-center my-5">Job Submit Status Change</h3>
                        <label className="input input-bordered flex items-center gap-2 my-2">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                            <input type="text" readOnly className="grow" defaultValue={modalData?.uid} placeholder="Email" />
                        </label>
                        <select className="select select-bordered w-full" value={statusValue} onChange={handleChange}>
                            <option disabled value={statusValue} hidden>{statusValue}</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                        <button onClick={() => HandleJobSubmitStatus(axiosSecure, refetch, modalData, statusValue, modalRef)} className='btn btn-error text-white my-2 w-full'>Status Change</button>
                    </div>
                </dialog>
            </div>
        </>
    );
};

export default JobsSubmit;