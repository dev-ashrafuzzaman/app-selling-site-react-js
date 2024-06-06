import { ToastContainer } from "react-toastify";
import useUserSecure from "../../../../hooks/web/useUserSecure";
import useWebUser from "../../../../hooks/web/useWebUser";
import { ErrorToast, SuccessToast } from "../../../../utils/Toastify";
import { softInfo } from "../../../../utils/info";
import { useEffect, useState } from "react";
import ScreenLoad from "../../../../components/ScreenLoad";

const DailyChecking = () => {
    const [isWebUser, refetch] = useWebUser();
    const [axiosSecure] = useUserSecure();
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = '//pl23173426.highcpmgate.com/9a/28/92/9a2892b632770c12a3619caea5f63e27.js';
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        const script1 = document.createElement('script');
        script1.type = 'text/javascript';
        script1.src = '//pl23173570.highcpmgate.com/52/61/d8/5261d80f7284dc579b3c84713ee51aed.js';
        script1.async = true;
        document.body.appendChild(script1);

        return () => {
            document.body.removeChild(script1);
        };
    }, []);

    const HandleClemDailyCom = async () => {
        setLoading(true)
        try {
            await axiosSecure.patch(`${import.meta.env.VITE_BASE_URL}/api/v1/web/user/daily-commission/${isWebUser?.user?.id}`)
                .then(data => {
                    if (data.data.modifiedCount > 0) {
                        setLoading(false)
                        refetch();
                        SuccessToast('Daily Commission Claim');
                    } else {
                        setLoading(false)
                        ErrorToast(data.data.Error);
                    }
                })

        } catch (error) {
            setLoading(false)
            console.error(error);
        }
    }
    return (
        <>
            {loading && <ScreenLoad></ScreenLoad>}
            <div className="my-10 max-w-screen-sm mx-auto">
                {
                    !isWebUser?.user?.comStatus && <div className="alert bg-red-50 my-4">
                        <span className="text-red-600">You Already Recived Daily Commission !</span>
                    </div>
                }
                <div className="bg-white rounded-2xl drop-shadow-xl border">
                    <div className="bg-gray-100 p-2 rounded-t-2xl text-xs font-bold border border-dashed">Received your daily commission</div>
                    <div className="bg-sky-50 my-4 p-4 text-center font-bold">
                        {softInfo.currencyIcon} {isWebUser?.global?.dailyCommission}
                    </div>
                    <div className="flex items-center justify-around px-2 pb-6 w-full gap-1 ">
                        <button onClick={() => HandleClemDailyCom()} disabled={!isWebUser?.user?.comStatus} className="btn btn-sm bg-purple-600 text-white">Received Now</button>
                    </div>
                </div>
                <div className="my-10">
                    <div className="bg-green-600 p-2 text-white rounded-t-xl">
                        <p>Daily Income {softInfo.currencyIcon} {isWebUser?.global?.dailyCommission}</p>
                    </div>
                    <div className="p-2 font-bold border">
                        <p>Invite Commission: {softInfo.currencyIcon} {isWebUser?.global?.dailyCommission}</p>
                    </div>
                    <div className="p-2 font-bold border">
                        <p>Per Year Active Commission: {softInfo.currencyIcon} {16500}</p>
                    </div>
                    <div className="p-2 font-bold border">
                        <p>5 Year Active Commission: {softInfo.currencyIcon} {180031}</p>
                    </div>
                    <div className="p-2 font-bold border">
                        <p>Invite 100(active member): {softInfo.currencyIcon} {100}</p>
                    </div>
                </div>
                <ToastContainer ></ToastContainer>
                <div id="container-eff19782ed440651885708d1d81c3ee7"></div>
            </div>
        </>
    );
};

export default DailyChecking;