import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { SuccessToast } from "../../../utils/Toastify";
import { ToastContainer } from "react-toastify";
import SectionTitle from "../../../components/SectionTitle";
import { softInfo } from "../../../utils/info";

const AddCustomer = () => {
    const { register, handleSubmit, reset } = useForm();
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();


    const onSubmit = async (data) => {
        try {
            const user = {
                userName: data.userName,
                sureName: data.sureName,
                email: data.email,
                mobile: data.mobile,
                altMobile: data.altMobile,
                password: data.password,
                address: data.address,
                city: data.city,
                state: data.state,
                whatsAppMobile: data.whatsAppMobile,
                status: true,

            };

            await axiosSecure.post("/api/v1/admin/user/", { user })
                .then(data => {
                    if (data.data.insertedId) {
                        SuccessToast('Create Success')
                        reset();
                        setTimeout(() => {
                            navigate('/leery/admin/dashboard/manage-users');
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
            <SectionTitle heading={'Add Customer'}></SectionTitle>

            <form onSubmit={handleSubmit(onSubmit)} className=" bg-[#F0F3F4] rounded-xl md:p-10 p-4" >
                <div className="md:flex gap-6">
                    <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                        <label className="label">
                            <span className="label-text">Name*</span>
                        </label>
                        <input type="text" placeholder="Type here name" {...register("sureName", { required: true })} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                        <label className="label">
                            <span className="label-text">Email*</span>
                        </label>
                        <input type="email" defaultValue={'im-@gmail.com'} placeholder="Type here email" {...register("email")} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                        <label className="label">
                            <span className="label-text">User Name*</span>
                        </label>
                        <input type="text" placeholder="Type here user name 017---" {...register("userName", { required: true })} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                    </div>
                </div>
                <div className="md:flex gap-6">

                    <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                        <label className="label">
                            <span className="label-text">Mobile No*</span>
                        </label>
                        <input type="text" placeholder="PhoMobilene" {...register("mobile", { required: true })} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                        <label className="label">
                            <span className="label-text">Whatsapp Mobile No*</span>
                        </label>
                        <input type="text" placeholder="Whatsapp Mobile" {...register("whatsAppMobile")} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                        <label className="label">
                            <span className="label-text">Alt Mobile No*</span>
                        </label>
                        <input type="text" placeholder="Mobile" {...register("altMobile")} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                        <label className="label">
                            <span className="label-text">Password*</span>
                        </label>
                        <input type="text" placeholder="Password" defaultValue={'123456'} {...register("password", { required: true })} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                    </div>
                </div>
                <div className="md:flex gap-6">
                    <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                        <label className="label">
                            <span className="label-text">Address*</span>
                        </label>
                        <input type="text" placeholder="Address" {...register("address")} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                        <label className="label">
                            <span className="label-text">City*</span>
                        </label>
                        <input type="text" defaultValue={'Jashore'} placeholder="City" {...register("city")} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                        <label className="label">
                            <span className="label-text">State*</span>
                        </label>
                        <input type="text" defaultValue={'Khulna'} placeholder="State" {...register("state", { required: true })} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                    </div>
                </div>
                <div className='flex justify-end items-center'>
                    <button type="submit" className={`py-2 btn  rounded  font-semibold text-white mt-6 md:w-[200px] w-full ${softInfo.btn}`}>
                        Add User
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCustomer;