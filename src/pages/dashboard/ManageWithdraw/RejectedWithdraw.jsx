import { useEffect, useState } from "react";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import TablePagination from "../../../utils/Table/TablePagination";
import { ToastContainer } from "react-toastify";
import WithdrawTable from "../../../components/Table/WithdrawTable";
import TableLoad from "../../../components/Table/TableLoad";
import TableTopSearch from "../../../utils/Table/TableTopSearch";
import SectionTitle from "../../../components/SectionTitle";
import useRejectedWithdraw from "../../../hooks/useRejectedWithdraw";
import { ErrorToast } from "../../../utils/Toastify";

const RejectedWithdraw = () => {
    const [axiosSecure] = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { isRejectedWithdraw, refetch, isRejectedWithdrawLoading } = useRejectedWithdraw(currentPage, pageSize, searchQuery);
    const [totalCount, setTotalCount] = useState(0);
    const totalPages = Math.ceil(totalCount / pageSize);


    const showModal = (data) => {
        ErrorToast(`Status remains ${data?.status}`)
    };

    useEffect(() => {
        if (isRejectedWithdraw) {
            setTotalCount(isRejectedWithdraw?.totalCount);
        }
    }, [isRejectedWithdraw]);

    return (
        <div className='px-8'>
            <SectionTitle heading={'Manage Rejected Withdraw'}></SectionTitle>

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
                                isRejectedWithdrawLoading && <TableLoad></TableLoad>
                            }
                            {
                                isRejectedWithdraw?.data?.map((customer, index) => <WithdrawTable
                                    key={customer._id}
                                    data={customer}
                                    sl={index}
                                    refetch={refetch}
                                    axiosSecure={axiosSecure}
                                    global={isRejectedWithdraw.global}
                                    user={isRejectedWithdraw?.users?.find(user => user.email == customer.uid)}
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
        </div>
    );
};

export default RejectedWithdraw;