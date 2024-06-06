import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { SuccessToast } from "../../../utils/Toastify";
import { ToastContainer } from "react-toastify";
import SectionTitle from "../../../components/SectionTitle";
import { softInfo } from "../../../utils/info";

const AddVisitEarn = () => {
    const { register, handleSubmit, reset } = useForm();
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();


    const onSubmit = async (data) => {
        try {
            const visit = {
                title: data.title,
                link: data.link,
                count: parseInt(0),
                status: true,
                time: parseInt(data.time),
                amount: parseFloat(data.amount),
            };

            await axiosSecure.post("/api/v1/admin/visit", { visit })
                .then(data => {
                    if (data.data.insertedId) {
                        SuccessToast('Create Success')
                        reset();
                        setTimeout(() => {
                            navigate('/leery/admin/dashboard/manage-visit-earn');
                        }, 2000)

                    }
                });

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full py-10 md:px-10 px-2">
            <ToastContainer></ToastContainer>
            <SectionTitle heading={'Add Visit Visit'}></SectionTitle>
            <div className=" bg-[#F0F3F4] rounded-xl md:p-10 p-4">
                <div className="my-4 space-y-4">

                </div>
                <form onSubmit={handleSubmit(onSubmit)} >
                    <div className="md:flex gap-6">
                        <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                            <label className="label">
                                <span className="label-text">Title*</span>
                            </label>
                            <input type="text" placeholder="Type here name" {...register("title", { required: true })} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                            <label className="label">
                                <span className="label-text">Amount*</span>
                            </label>
                            <input type="text" defaultValue={0} placeholder="Type here Amount" {...register("amount")} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                            <label className="label">
                                <span className="label-text">Time {`{1sec = 1000 || 1*1000 = 1000}`}</span>
                            </label>
                            <input type="number" placeholder="Time" {...register("time", { required: true })} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                        </div>
                    </div>
                    <div className="md:flex gap-6">
                        <div className="form-control w-full">
                            <label className="label">
                                <span className="label-text">Link*</span>
                            </label>
                            <input type="text" placeholder="Link" {...register("link", { required: true })} className="input input-bordered w-full" />
                        </div>
                    </div>

                    <div className='flex justify-end items-center'>
                        <button type="submit" className={`py-2 btn  rounded  font-semibold text-white mt-6 md:w-[200px] w-full ${softInfo.btn}`}>
                            Add Visit Earn
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddVisitEarn;