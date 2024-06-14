import { FaFirstOrder, FaJediOrder, FaResearchgate, FaUser } from 'react-icons/fa';
import { MdBlock, MdDone, MdPending, MdVerifiedUser } from "react-icons/md";
import { softInfo } from '../../utils/info';
import useAdminStat from '../../hooks/useAdminStat';
import { FaFirstOrderAlt } from 'react-icons/fa6';
const Home = () => {
    const [isAdminStat] = useAdminStat()
    console.log(isAdminStat);
    return (
        <>
            <div className='my-10'>
                <div className='grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2  grid-cols-1 gap-4'>
                    {/* Admin Section */}
                    <div className='flex justify-between items-center bg-white p-4 rounded-2xl drop-shadow-xl'>
                        <div>
                            <p className='font-semibold text-xl'>Total Users</p>
                            <p className='font-extrabold text-3xl'>{isAdminStat?.totalUser}</p>
                        </div>
                        <div className={`bg-gradient-to-r ${softInfo.adminStat}  p-6 rounded-2xl text-white text-xl`}>
                            <FaUser></FaUser>
                        </div>
                    </div>

                    <div className='flex justify-between items-center bg-white p-4 rounded-2xl drop-shadow-xl'>
                        <div>
                            <p className='font-semibold text-xl'>Active Users</p>
                            <p className='font-extrabold text-3xl'>{isAdminStat?.activeUser}</p>
                        </div>
                        <div className={`bg-gradient-to-r ${softInfo.adminStat}  p-6 rounded-2xl text-white text-xl`}>
                            <MdVerifiedUser></MdVerifiedUser>
                        </div>
                    </div>
                    <div className='flex justify-between items-center bg-white p-4 rounded-2xl drop-shadow-xl'>
                        <div>
                            <p className='font-semibold text-xl'>Banned Users</p>
                            <p className='font-extrabold text-3xl'>{isAdminStat?.BanUser}</p>
                        </div>
                        <div className={`bg-gradient-to-r ${softInfo.adminStat}  p-6 rounded-2xl text-white text-xl`}>
                            <MdBlock></MdBlock>
                        </div>
                    </div>

                    <div className='flex justify-between items-center bg-white p-4 rounded-2xl drop-shadow-xl'>
                        <div>
                            <p className='font-semibold text-xl'>Pending Payment</p>
                            <p className='font-extrabold text-3xl'>{isAdminStat?.pendingWithdraw}</p>
                        </div>
                        <div className={`bg-gradient-to-r ${softInfo.adminStat}  p-6 rounded-2xl text-white text-xl`}>
                            <MdPending></MdPending>
                        </div>
                    </div>
                    <div className='flex justify-between items-center bg-white p-4 rounded-2xl drop-shadow-xl'>
                        <div>
                            <p className='font-semibold text-xl'>Completed Payment</p>
                            <p className='font-extrabold text-3xl'>{isAdminStat?.completeWithdraw}</p>
                        </div>
                        <div className={`bg-gradient-to-r ${softInfo.adminStat}  p-6 rounded-2xl text-white text-xl`}>
                            <MdDone></MdDone>
                        </div>
                    </div>

                    <div className='flex justify-between items-center bg-white p-4 rounded-2xl drop-shadow-xl'>
                        <div>
                            <p className='font-semibold text-xl'>Total Order</p>
                            <p className='font-extrabold text-3xl'>{isAdminStat?.totalOrder}</p>
                        </div>
                        <div className={`bg-gradient-to-r ${softInfo.adminStat}  p-6 rounded-2xl text-white text-xl`}>
                          <FaFirstOrderAlt></FaFirstOrderAlt>
                        </div>
                    </div>

                    <div className='flex justify-between items-center bg-white p-4 rounded-2xl drop-shadow-xl'>
                        <div>
                            <p className='font-semibold text-xl'>Pending Order</p>
                            <p className='font-extrabold text-3xl'>{isAdminStat?.pendingOrder}</p>
                        </div>
                        <div className={`bg-gradient-to-r ${softInfo.adminStat}  p-6 rounded-2xl text-white text-xl`}>
                            <FaJediOrder></FaJediOrder>
                        </div>
                    </div>
                    <div className='flex justify-between items-center bg-white p-4 rounded-2xl drop-shadow-xl'>
                        <div>
                            <p className='font-semibold text-xl'>Complete Order</p>
                            <p className='font-extrabold text-3xl'>{isAdminStat?.completeOrder}</p>
                        </div>
                        <div className={`bg-gradient-to-r ${softInfo.adminStat}  p-6 rounded-2xl text-white text-xl`}>
                            <FaFirstOrder></FaFirstOrder>
                        </div>
                    </div>
                    <div className='flex justify-between items-center bg-white p-4 rounded-2xl drop-shadow-xl'>
                        <div>
                            <p className='font-semibold text-xl'>Total Reseller</p>
                            <p className='font-extrabold text-3xl'>{isAdminStat?.reseller}</p>
                        </div>
                        <div className={`bg-gradient-to-r ${softInfo.adminStat}  p-6 rounded-2xl text-white text-xl`}>
                           <FaResearchgate></FaResearchgate>
                        </div>
                    </div>

                </div>
                {/* <div className='bg-white my-10 p-2 rounded-2xl'>
                    <div className='flex justify-between items-center'>
                        <p className='text-xl font-semibold'>User Analytics</p>
                        <p className='border p-2 px-4 text-slate-400 rounded-full'>i</p>
                    </div>
                    <div></div>
                </div> */}
            </div>
        </>
    );
};

export default Home;