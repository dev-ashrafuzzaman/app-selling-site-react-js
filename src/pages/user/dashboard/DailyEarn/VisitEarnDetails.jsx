import { FaCoins } from "react-icons/fa";
import { MdPunchClock } from "react-icons/md";
import { useLoaderData, useNavigate } from "react-router-dom";
import useWebUser from "../../../../hooks/web/useWebUser";
import { useEffect, useState } from "react";
import useUserSecure from "../../../../hooks/web/useUserSecure";
import { ErrorToast, SuccessToast } from "../../../../utils/Toastify";
import ScreenLoad from "../../../../components/ScreenLoad";
import { ToastContainer } from "react-toastify";

const VisitEarnDetails = () => {
    const info = useLoaderData();
    const [axiosSecure] = useUserSecure();
    const [loading, setLoading] = useState(false)
    const [isWebUser] = useWebUser();
    const [ClimeClick, setClimeClick] = useState(false);
    const [timer, setTimer] = useState(info.time / 1000);
    const [completed, setCompleted] = useState(false);
    const [visitClick, setVisitClick] = useState(false);
    const navigate = useNavigate();

    // eslint-disable-next-line react-hooks/exhaustive-deps
    const onFocus = () => {
        if (!completed && visitClick) {
            alert('Warning: You have broken work rules');
            navigate('/user/auth/dashboard/home')
            setTimer(info.time / 1000);
        }
    };

    useEffect(() => {
        if (timer === 0 && !completed) {
            setClimeClick(true)
            setVisitClick(false)
            setCompleted(true); // Auto-complete the task if time runs out
        }

        const interval = visitClick && setInterval(() => {
            setTimer(prevTimer => prevTimer - 1);
        }, 1000); // Decrease timer every second

        window.addEventListener("focus", onFocus);

        return () => {
            clearInterval(interval);
            window.removeEventListener("focus", onFocus);
        };
    }, [timer, completed, visitClick, info.time, onFocus]);


    const handleVisitExternalWebsite = () => {
        setVisitClick(true);
        window.open(info.link, '_blank');
    };


    const handleVisitEarn = async (vId) => {
        setLoading(true)
        try {
            await axiosSecure.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/web/user/visit-earn/claim/${isWebUser?.user?.id}`, { vId })
                .then(data => {
                    console.log(data);
                    if (data.data.acknowledged) {
                        setLoading(false)
                        SuccessToast('Claim Success')
                        setTimeout(() => {
                            navigate('/user/auth/dashboard/visit-earn/')
                        }, 2000)
                    } else {
                        setLoading(false)
                        ErrorToast(data.data.Error)
                        setTimeout(() => {
                            navigate('/user/auth/dashboard/visit-earn/')
                        }, 2000)
                    }
                })

        } catch (error) {
            setLoading(false)
            console.error(error);
        }
    }

    return (
        <>{loading && <ScreenLoad></ScreenLoad>}
            <div className="max-w-screen-sm mx-auto my-10">
                <div className={`card bg-base-100 shadow-xl border-2 border-dashed cursor-pointer`}>
                    <div>
                        <div className='bg-red-500  flex  md:h-[250px] h-[150px] rounded-2xl bg-cover' style={{
                            backgroundImage: `url(${'https://udaipurmirror.com/wp-content/uploads/2020/12/30-Best-Ways-to-Make-Money-Online-1024x576.jpg'})`
                        }}>
                            <div className="h-full">
                                <div className='gap-4 flex flex-col justify-between h-full'>
                                    <div className={`bg-black text-white rounded-tl-xl rounded-br-xl px-2 py-1 text-xs`}>
                                        <p className="flex items-center gap-1"><MdPunchClock></MdPunchClock><span> {info.time / 1000} Sec</span></p>
                                    </div>
                                    <div className='p-2 hover:cursor-pointer'>
                                        <p className="font-bold text-white">Visit</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-2 flex justify-between items-center gap-4 p-4">
                        <h2 className="text-sm w-full line-clamp-1">{info.title}</h2>
                        <h2 className="text-sm flex items-center gap-1 badge-success py-1 px-2 text-white rounded-full"><FaCoins></FaCoins>{info.amount}</h2>
                    </div>
                    <div>
                        {
                            completed ? <p className="text-center font-bold my-2 text-green-600">{`Congratulations! Time's up. Click the Claim Button to complete the task.`}</p> :
                                <p className="text-center font-bold my-2 text-red-600">Time remaining: {timer} seconds</p>
                        }

                    </div>
                    <div>
                        <button onClick={() => handleVisitEarn(info._id)} className={`btn w-full btn-error rounded-b-2xl text-white text-xl ${!ClimeClick ? 'hidden' : 'block'}`}>Claim Now</button>
                        <button disabled={visitClick} onClick={() => handleVisitExternalWebsite()} className={`btn w-full btn-success rounded-b-2xl text-white text-xl ${ClimeClick ? 'hidden' : 'block'}`}>Visit Now</button>
                    </div>
                </div>
                <ToastContainer></ToastContainer>
            </div>
        </>
    );
};

export default VisitEarnDetails;