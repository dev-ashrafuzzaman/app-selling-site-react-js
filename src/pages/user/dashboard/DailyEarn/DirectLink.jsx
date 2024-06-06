import { Link } from "react-router-dom";
import ScreenLoad from "../../../../components/ScreenLoad";
import useWebUser from "../../../../hooks/web/useWebUser";
import { MdPunchClock } from "react-icons/md";
import { FaCoins } from "react-icons/fa";

const DirectLink = () => {
    const [isWebUser , ,isWebUserLoading] = useWebUser()

    return (
        <> {isWebUserLoading && <ScreenLoad></ScreenLoad>}
        <div className="max-w-screen-sm mx-auto flex justify-center items-center my-10">
            <div className="grid gap-4">
                {
                    isWebUser?.direct?.map((visit, index) => <div
                    className=" w-[350px]"
                        key={index}
                    >
                        <div className={`card bg-base-100 shadow-xl border-2 border-dashed cursor-pointer`}>
                            <Link to={`/user/auth/dashboard/direct-link/${visit._id}`}>
                                <div className='bg-red-500  flex  md:h-[230px] h-[150px] rounded-2xl bg-cover' style={{
                                    backgroundImage: `url(${'https://udaipurmirror.com/wp-content/uploads/2020/12/30-Best-Ways-to-Make-Money-Online-1024x576.jpg'})`
                                }}>
                                    <div className="h-full">
                                        <div className='gap-4 flex flex-col justify-between h-full'>
                                            <div className={`bg-black text-white rounded-tl-xl rounded-br-xl px-2 py-1 text-xs`}>
                                                <p className="flex items-center gap-1"><MdPunchClock></MdPunchClock><span>New</span></p>
                                            </div>
                                            <div className='p-2 hover:cursor-pointer'>
                                                <p className="font-bold text-white">Details</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <div className="space-y-2 flex justify-between items-center gap-4 p-4">
                                <h2 className="text-sm w-full line-clamp-1 text-red-600">{visit.title}</h2>
                                <h2 className="text-sm flex items-center gap-1 badge-success py-1 px-2 text-white rounded-full"><FaCoins></FaCoins>{visit.amount}</h2>
                            </div>
                        </div>
                    </div>)
                }
            </div>
        </div>
    </>
    );
};

export default DirectLink;