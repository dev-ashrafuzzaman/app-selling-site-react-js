import { useLoaderData } from 'react-router-dom';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useForm } from 'react-hook-form';
import { ToastContainer } from 'react-toastify';
import SectionTitle from '../../../components/SectionTitle';
import { SuccessToast } from '../../../utils/Toastify';
import { softInfo } from '../../../utils/info';

const UpdateCustomer = () => {
    const userInfo = useLoaderData();
    const [axiosSecure] = useAxiosSecure();
    const { register, handleSubmit } = useForm();

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
            };

            await axiosSecure.patch(`/api/v1/admin/user/${userInfo._id}`, { user })
                .then(data => {
                    if (data.data.modifiedCount > 0) {
                        SuccessToast("Update Success")
                    }
                })

        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full py-10 md:px-10 px-2">
            <SectionTitle heading={'Update Customer'}></SectionTitle>
            <ToastContainer></ToastContainer>
            <form onSubmit={handleSubmit(onSubmit)} className=" bg-[#F0F3F4] rounded-xl md:p-10 p-4" >
                <div className="md:flex gap-6">
                    <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                        <label className="label">
                            <span className="label-text">Name*</span>
                        </label>
                        <input type="text" defaultValue={userInfo.sureName} placeholder="Type here name" {...register("sureName", { required: true })} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                        <label className="label">
                            <span className="label-text">Email*</span>
                        </label>
                        <input type="email" defaultValue={userInfo.email} placeholder="Type here email" {...register("email")} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                        <label className="label">
                            <span className="label-text">User Name*</span>
                        </label>
                        <input type="text" defaultValue={userInfo.userName} placeholder="Type here user name 017---" {...register("userName", { required: true })} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                    </div>
                </div>
                <div className="md:flex gap-6">

                    <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                        <label className="label">
                            <span className="label-text">Mobile No*</span>
                        </label>
                        <input type="text" defaultValue={userInfo.mobile} placeholder="PhoMobilene" {...register("mobile", { required: true })} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                        <label className="label">
                            <span className="label-text">Whatsapp Mobile No*</span>
                        </label>
                        <input type="text" defaultValue={userInfo.whatsAppMobile} placeholder="Whatsapp Mobile" {...register("whatsAppMobile")} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                        <label className="label">
                            <span className="label-text">Alt Mobile No*</span>
                        </label>
                        <input type="text" defaultValue={userInfo.altMobile} placeholder="Mobile" {...register("altMobile")} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                        <label className="label">
                            <span className="label-text">Password*</span>
                        </label>
                        <input type="text" placeholder="Password" defaultValue={userInfo.password} {...register("password", { required: true })} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                    </div>
                </div>
                <div className="md:flex gap-6">
                    <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                        <label className="label">
                            <span className="label-text">Address*</span>
                        </label>
                        <input type="text" defaultValue={userInfo.address} placeholder="Address"  {...register("address")} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                        <label className="label">
                            <span className="label-text">City*</span>
                        </label>
                        <input type="text" defaultValue={userInfo.city} placeholder="City" {...register("city")} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                    </div>
                    <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                        <label className="label">
                            <span className="label-text">State*</span>
                        </label>
                        <input type="text" defaultValue={userInfo.state} placeholder="State" {...register("state")} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                    </div>
                </div>

                <div className='flex justify-end items-center'>
                    <button type="submit" className={`py-2 btn  rounded  font-semibold text-white mt-6 md:w-[200px] w-full ${softInfo.btn}`}>
                        Update Installer
                    </button>
                </div>
            </form>
        </div>
    );
};

export default UpdateCustomer;