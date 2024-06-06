import { ToastContainer } from "react-toastify";

const DailyEarn = () => {

    

    return (
        <div className="my-10 max-w-screen-sm mx-auto">
            <div className="bg-white rounded-2xl drop-shadow-xl border">
                <div className="bg-gray-100 p-2 rounded-t-2xl text-xl font-bold border border-dashed">Daily Work</div>
                <div className="flex items-center justify-around px-2 py-6 w-full gap-1 ">
                    <a href={'/user/auth/dashboard/daily-checking'} className="btn btn-sm btn-accent text-white">Daily Checking</a>
                    <a href={'/user/auth/dashboard/direct-link'} className="btn btn-sm btn-info text-white">Direct Link</a>
                    <a href={'/user/auth/dashboard/visit-earn'} className="btn btn-sm btn-success text-white">Visit Earn</a>
                </div>
            </div>
            <ToastContainer ></ToastContainer>
        </div>
    );
};

export default DailyEarn;