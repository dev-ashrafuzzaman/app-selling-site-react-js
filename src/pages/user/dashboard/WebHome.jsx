import { FaUser } from "react-icons/fa";
import useWebUser from "../../../hooks/web/useWebUser";
import Marquee from "react-fast-marquee";
import { softInfo } from "../../../utils/info";
import { MdOutbox, MdWallet } from "react-icons/md";
import useUserWithdraw from "../../../hooks/web/useUserWithdraw";
const WebHome = () => {
    const [isWebUser, refetch] = useWebUser()
    const [isUserWithdraw] = useUserWithdraw();
    const totalAmount = isUserWithdraw ? calculateTotalAmount(isUserWithdraw.filter(data => data.status == 'Approved')) : 0;

    function calculateTotalAmount(withdrawData) {
        // Assuming withdrawData is an array of objects containing amount information
        return withdrawData?.reduce((total, withdraw) => total + withdraw?.outAmount, 0);
    }
    return (
        <div className="my-6">
            <div className="border-2 w-full  my-2 flex justify-start items-center gap-2">
                <div className="bg-red-50 h-12 text-red-600 p-2 font-bold flex justify-center items-center ">
                    <p>Notice</p>
                </div>
                <div className="text-red-600 w-full">
                    <Marquee className="h-12">
                        {isWebUser?.global?.topNews}
                    </Marquee>
                </div>
            </div>
            <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-3 my-4">
                <div className='flex justify-between items-center bg-white p-4 rounded-2xl drop-shadow-xl'>
                    <div>
                        <p className='font-semibold text-xl'>Earning</p>
                        <p className='font-extrabold text-3xl'>{parseFloat(isWebUser?.user?.balance).toFixed(4)}</p>
                    </div>
                    <div onClick={() => refetch()} className={`bg-gradient-to-r ${softInfo.adminStat}  p-6 rounded-2xl text-white text-xl tooltip`} data-tip={'Refresh'}>
                        <MdWallet></MdWallet>
                    </div>
                </div>
                <div className='flex justify-between items-center bg-white p-4 rounded-2xl drop-shadow-xl'>
                    <div>
                        <p className='font-semibold text-xl'>Total Ref</p>
                        <p className='font-extrabold text-3xl'>{isWebUser?.global?.dailyCommission}</p>
                    </div>
                    <div className={`bg-gradient-to-r ${softInfo.adminStat}  p-6 rounded-2xl text-white text-xl`}>
                        <FaUser></FaUser>
                    </div>
                </div>
                <div className='flex justify-between items-center bg-white p-4 rounded-2xl drop-shadow-xl'>
                    <div>
                        <p className='font-semibold text-xl'>Total Withdraw</p>
                        <p className='font-extrabold text-3xl'>{totalAmount}</p>
                    </div>
                    <div className={`bg-gradient-to-r ${softInfo.adminStat}  p-6 rounded-2xl text-white text-xl`}>
                        <MdOutbox></MdOutbox>
                    </div>
                </div>
                {/* <div className='flex justify-between items-center bg-white p-4 rounded-2xl drop-shadow-xl'>
                    <div>
                        <p className='font-semibold text-xl'>Bonus</p>
                        <p className='font-extrabold text-3xl'>{20}</p>
                    </div>
                    <div className={`bg-gradient-to-r ${softInfo.adminStat}  p-6 rounded-2xl text-white text-xl`}>
                        <MdOutlineCommentsDisabled></MdOutlineCommentsDisabled>
                    </div>
                </div> */}
            </div>

            {/* <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-white border border-dashed p-4 rounded-2xl drop-shadow-xl flex justify-start items-center flex-col md:flex-row gap-2">
                    <img width={50} src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/82/Telegram_logo.svg/512px-Telegram_logo.svg.png" alt="Telegram Logo" />
                    <p className="font-bold text-justify">প্রতিদিন এর আপডেট যানতে ও নতুন নতুন অনলাইন ইনকাম সোর্স যান্তে আমাদের যাথে যুক্ত থাকুন</p>
                    <a href={isWebUser?.global?.telegramChannel} target="_blank" className="btn w-28 bg-sky-500 text-white hover:bg-sky-400">Join Now</a>
                </div>
                <div className="bg-white border border-dashed p-4 rounded-2xl drop-shadow-xl space-y-6">
                    <p className="flex items-center gap-2 font-semibold text-justify"># {isWebUser?.global?.dailyNews}</p>
                    <p className="flex items-center gap-2 font-semibold text-red-500 text-justify"># {isWebUser?.global?.refNews}</p>
                </div>
            </div> */}
        </div>
    );
};

export default WebHome;