import { MdDateRange, MdPriceCheck } from "react-icons/md";
import { Link } from "react-router-dom";

const JobsCard = ({ job,refetch }) => {
    return (
        <div className="card card-compact bg-base-100 shadow-xl w-full border drop-shadow-xl">
            <figure className="h-[300px]"><img src={job.img} className="w-full" alt="Shoes" /></figure>
            <div className="card-body">
                <h2 className="card-title line-clamp-1">{job.title}</h2>
                <div className="flex justify-center items-center bg-slate-100 p-2 gap-1 rounded-lg">
                    <p className="badge font-bold">Vacancy: {job.vacancy}</p>
                    <p className="badge text-red-600">Available: {job.vacancy - job.attempt}</p>
                </div>
                <p className="flex items-center gap-2 font-semibold text-slate-500"><MdPriceCheck></MdPriceCheck> Job Price: <span className="text-black">{job.jobPrice}</span></p>
                <p className="flex items-center gap-2 font-semibold text-slate-500"><MdDateRange></MdDateRange> Published Date: <span className="text-black">{job.published}</span></p>
                <div className="card-actions w-full">
                    <Link to={`/user/auth/dashboard/work-info/${job._id}`} className="px-14 text-base w-full text-center  drop-shadow-2xl bg-[#18BE71] hover:bg-[#54e7a3] py-2 text-white font-semibold rounded-full cursor-pointer">Details</Link>
                </div>
            </div>
        </div>
    );
};

export default JobsCard;