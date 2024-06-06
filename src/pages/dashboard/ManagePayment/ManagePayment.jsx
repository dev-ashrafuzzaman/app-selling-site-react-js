import { useEffect, useState } from "react";
import usePayment from "../../../hooks/usePayment";
import TableLoad from "../../../components/Table/TableLoad";
import { ToastContainer } from "react-toastify";
import TablePagination from "../../../utils/Table/TablePagination";
import PaymentTable from "../../../components/Table/PaymentTable";
import TableTopSearch from "../../../utils/Table/TableTopSearch";
import SectionTitle from "../../../components/SectionTitle";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const ManagePayment = () => {
    const [axiosSecure] = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { isPayment, refetch, isPaymentLoading } = usePayment(currentPage, pageSize, searchQuery);
    const [totalCount, setTotalCount] = useState(0);
    const totalPages = Math.ceil(totalCount / pageSize);

    useEffect(() => {
        if (isPayment) {
            setTotalCount(isPayment?.totalCount);
        }
    }, [isPayment]);



    return (
        <div className='px-8'>
            <SectionTitle heading={'Manage Payments'}></SectionTitle>

            {/* Search Page Select and Refresh Section*/}
            <TableTopSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} refetch={refetch}></TableTopSearch>

            {/* Table Section With Pagination */}
            <div>
                <div className="overflow-x-auto bg-white p-6 rounded-2xl">
                    <table className="table">
                        <thead className='font-bold text-black text-sm'>
                            <tr>
                                <th className='border-b-2 border-black'>#</th>
                                <th className='border-b-2 border-black '>Email</th>
                                <th className='border-b-2 border-black '>Ref Id</th>
                                <th className='border-b-2 border-black'>Name</th>
                                <th className='border-b-2 border-black'>UserName</th>
                                <th className='border-b-2 border-black'>Active Vip</th>
                                <th className='border-b-2 border-black'>Balance</th>
                                <th className='border-b-2 border-black'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isPaymentLoading && <TableLoad></TableLoad>
                            }
                            {
                                isPayment?.data?.map((customer, index) => <PaymentTable
                                    key={customer._id}
                                    data={customer}
                                    sl={index}
                                    refetch={refetch}
                                    axiosSecure={axiosSecure}
                                ></PaymentTable>)
                            }
                        </tbody>
                    </table>
                </div>
                {/* Pagination */}
                <TablePagination setCurrentPage={setCurrentPage} refetch={refetch} searchQuery={searchQuery} totalPages={totalPages} currentPage={currentPage} pageSize={pageSize} totalCount={totalCount} setPageSize={setPageSize}></TablePagination>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default ManagePayment;