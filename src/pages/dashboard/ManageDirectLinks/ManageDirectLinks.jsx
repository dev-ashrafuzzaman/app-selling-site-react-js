import { useEffect, useState } from 'react';
import SectionTitle from '../../../components/SectionTitle';
import TablePagination from '../../../utils/Table/TablePagination';
import TableTopSearch from '../../../utils/Table/TableTopSearch';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { ToastContainer } from 'react-toastify';
import TableLoad from '../../../components/Table/TableLoad';
import useDirectLink from '../../../hooks/useDirectLink';
import DirectTable from '../../../components/Table/DirectTable';

const ManageDirectLinks = () => {
    const [axiosSecure] = useAxiosSecure();
    const [searchQuery, setSearchQuery] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const { isDirectLink, refetch, isDirectLinkLoading } = useDirectLink(currentPage, pageSize, searchQuery);
    const [totalCount, setTotalCount] = useState(0);
    const totalPages = Math.ceil(totalCount / pageSize);



    useEffect(() => {
        if (isDirectLink) {
            setTotalCount(isDirectLink?.totalCount);
        }
    }, [isDirectLink]);



    return (
        <div className='px-8'>
            <SectionTitle heading={'Manage Direct Link'}></SectionTitle>

            {/* Search Page Select and Refresh Section*/}
            <TableTopSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} refetch={refetch}></TableTopSearch>

            {/* Table Section With Pagination */}
            <div>
                <div className="overflow-x-auto bg-white p-6 rounded-2xl">
                    <table className="table">
                        <thead className='font-bold text-black text-sm'>
                            <tr>
                                <th className='border-b-2 border-black w-1'>#</th>
                                <th className='border-b-2 border-black w-1'>Link</th>
                                <th className='border-b-2 border-black w-1'>Title</th>
                                <th className='border-b-2 border-black w-1'>Published</th>
                                <th className='border-b-2 border-black w-1'>Total Attempt</th>
                                <th className='border-b-2 border-black w-1'>Amount</th>
                                <th className='border-b-2 border-black w-1'>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                isDirectLinkLoading && <TableLoad></TableLoad>
                            }
                            {
                                isDirectLink?.data?.map((job, index) => <DirectTable
                                    key={job._id}
                                    data={job}
                                    sl={index}
                                    refetch={refetch}
                                    axiosSecure={axiosSecure}
                                ></DirectTable>)
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

export default ManageDirectLinks;