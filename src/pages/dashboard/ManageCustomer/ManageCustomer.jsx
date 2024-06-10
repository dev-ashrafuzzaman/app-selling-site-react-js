import { useEffect, useRef, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle';
import CustomerTable from '../../../components/Table/CustomerTable';
import useCustomer from '../../../hooks/useCustomer';
import TablePagination from '../../../utils/Table/TablePagination';
import TableTopSearch from '../../../utils/Table/TableTopSearch';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { ToastContainer } from 'react-toastify';
import TableLoad from '../../../components/Table/TableLoad';
import { HandleUserPassChange } from '../../../utils/WebUsers/HandlePasswordChange';
import { HandleUserBonus } from '../../../utils/WebUsers/HandleUserBonus';

const ManageCustomer = () => {
    const [axiosSecure] = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { isCustomer, refetch, isCustomerLoading } = useCustomer(currentPage, pageSize, searchQuery);
    const [totalCount, setTotalCount] = useState(0);
    const totalPages = Math.ceil(totalCount / pageSize);


    const [passValues, setValues] = useState({
        newPass: '',
    })
    const [bonusValue, setBonusValue] = useState({
        amount: '',
    })

    
    const modalRef = useRef(null);
    const [modalData, setModalData] = useState(null);
    const showModal = (data) => {
        setModalData(data);
        modalRef.current.showModal();
    };

    const modalRef1 = useRef(null);
    const [modalData1, setModalData1] = useState(null);
    const showModal1 = (data) => {
        setModalData1(data);
        modalRef1.current.showModal();
    };




    useEffect(() => {
        if (isCustomer) {
            setTotalCount(isCustomer?.totalCount);
        }
    }, [isCustomer]);



    return (
        <div className='md:px-8'>
            <SectionTitle heading={'Manage Users'}></SectionTitle>

            {/* Search Page Select and Refresh Section*/}
            <TableTopSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} refetch={refetch}></TableTopSearch>

            {/* Table Section With Pagination */}
            <div className='hidden md:block'>
                <div className="overflow-x-auto bg-white p-6 rounded-2xl">
                    <table className="table">
                        <thead className='font-bold text-black text-sm'>
                            <tr>
                                <th className='border-b-2 border-black w-1'>#</th>
                                <th className='border-b-2 border-black w-1'>Email</th>
                                <th className='border-b-2 border-black w-1'>Ref Id</th>
                                <th className='border-b-2 border-black w-1'>Name</th>
                                <th className='border-b-2 border-black w-1'>RefBy</th>
                                <th className='border-b-2 border-black w-1'>IP</th>
                                <th className='border-b-2 border-black w-1'>Balance</th>
                                <th className='border-b-2 border-black w-1'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isCustomerLoading && <TableLoad></TableLoad>
                            }
                            {
                                isCustomer?.data?.map((customer, index) => <CustomerTable
                                    key={customer._id}
                                    data={customer}
                                    sl={index}
                                    refetch={refetch}
                                    axiosSecure={axiosSecure}
                                    showModal={showModal}
                                    showModal1={showModal1}
                                ></CustomerTable>)
                            }
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <TablePagination setCurrentPage={setCurrentPage} refetch={refetch} searchQuery={searchQuery} totalPages={totalPages} currentPage={currentPage} pageSize={pageSize} totalCount={totalCount} setPageSize={setPageSize}></TablePagination>
            </div>

            {/* Mobile View */}
            {/* <div className='block md:hidden'>
                {
                    isCustomerLoading && <TableLoad></TableLoad>
                }
                {
                    isCustomer?.data?.map((customer) => <CustomerMobileView
                        key={customer._id}
                        data={customer}
                        refetch={refetch}
                        axiosSecure={axiosSecure}
                        showModal={showModal}
                        showModal1={showModal1}
                    ></CustomerMobileView>)
                }
                <TablePagination setCurrentPage={setCurrentPage} refetch={refetch} searchQuery={searchQuery} totalPages={totalPages} currentPage={currentPage} pageSize={pageSize} totalCount={totalCount} setPageSize={setPageSize}></TablePagination>
            </div> */}
            <ToastContainer></ToastContainer>
            <dialog id="my_modal_1" ref={modalRef} className="modal ">
                <div className="modal-box">
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-error text-white absolute right-2 top-2">✕</button>
                        </form>
                    </div>
                    <h3 className="font-bold text-lg text-center my-5">Password Change</h3>
                    <label className="input input-bordered flex items-center gap-2 my-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input type="text" readOnly className="grow" defaultValue={modalData?.email} placeholder="Email" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input type="password" required className="grow"
                            onChange={e => setValues({ ...passValues, newPass: e.target.value })} />
                    </label>
                    <button onClick={() => HandleUserPassChange(axiosSecure, modalData._id, passValues, modalRef)} className='btn btn-error text-white my-2 w-full'>Change Password</button>
                </div>
            </dialog>
            <dialog id="my_modal_2" ref={modalRef1} className="modal ">
                <div className="modal-box">
                    <div className="modal-action">
                        <form method="dialog">
                            {/* if there is a button in form, it will close the modal */}
                            <button className="btn btn-sm btn-circle btn-error text-white absolute right-2 top-2">✕</button>
                        </form>
                    </div>
                    <h3 className="font-bold text-lg text-center my-5">Claim Bonus</h3>
                    <label className="input input-bordered flex items-center gap-2 my-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" /><path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" /></svg>
                        <input type="text" readOnly className="grow" defaultValue={modalData1?.email} placeholder="Email" />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" /></svg>
                        <input type="text" required className="grow" defaultValue={0}
                            onChange={e => setBonusValue({ ...bonusValue, amount: e.target.value })} />
                    </label>
                    <button onClick={() => HandleUserBonus(axiosSecure, refetch, modalData1._id, bonusValue, modalRef1, setBonusValue)} className='btn btn-success text-white my-2 w-full'>Claim Bouns</button>
                </div>
            </dialog>
        </div>
    );
};

export default ManageCustomer;