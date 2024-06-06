import { MdArrowForward, MdDateRange, MdPriceCheck } from 'react-icons/md';
import { useLoaderData, useNavigate } from 'react-router-dom';
import useUserSecure from '../../../../hooks/web/useUserSecure';
import { useState } from 'react';
import useWebUser from '../../../../hooks/web/useWebUser';
import { useForm } from 'react-hook-form';
import { ErrorToast, SuccessToast } from '../../../../utils/Toastify';
import { getCurrentDateTime } from '../../../../utils/HandleCurrentDate';
import ScreenLoad from '../../../../components/ScreenLoad';
import { ToastContainer } from 'react-toastify';

const WorkInfo = () => {
    const job = useLoaderData();
    const [axiosSecure] = useUserSecure();
    const [loading, setLoading] = useState(false)
    const [visitClick, setVisitClick] = useState(false);
    const [upload1, setUpload1] = useState(false);
    const [upload2, setUpload2] = useState(false);
    const { register, handleSubmit, reset } = useForm();
    const [isWebUser] = useWebUser();
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);

        // Check if image is provided
        if (!data.image || !data.image[0]) {
            setLoading(false);
            ErrorToast("Please select an image.");
            return;
        }

        // Check if the file is an image
        const allowedImageTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
        if (!allowedImageTypes.includes(data.image[0].type)) {
            setLoading(false);
            ErrorToast("Please select a valid image file (JPEG, PNG, GIF, or JPG).");
            return;
        }

        // Check image size
        const imageSize = data.image[0].size / 1024; // in KB
        if (imageSize > 1000) {
            setLoading(false);
            ErrorToast("Image size exceeds 1000KB limit.");
            return;
        }

        const formData = new FormData();
        formData.append("image", data.image[0]);
        formData.append("targetLink", 'directLink');

        try {
            const response = await axiosSecure.post("/public/upload", formData);
            await axiosSecure.patch(`/api/v1/web/user/job/semi-final/claim/${isWebUser?.user?.id}`, { jobId: job._id, prof1: response.data.imageUrl, subTime1: getCurrentDateTime() })
                .then(data => {
                    if (data.data.modifiedCount > 0) {
                        setUpload2(true);
                        setUpload1(false);
                        setLoading(false);
                        SuccessToast('Submit 1 Success');
                        reset();
                    } else {
                        setLoading(false);
                        ErrorToast(data.data.Error);
                    }
                });
        } catch (error) {
            setLoading(false);
        }
    }

    const onSubmit1 = async (data) => {
        setLoading(true);

        // Check if image is provided
        if (!data.image || !data.image[0]) {
            setLoading(false);
            ErrorToast("Please select an image.");
            return;
        }

        // Check if the file is an image
        const allowedImageTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
        if (!allowedImageTypes.includes(data.image[0].type)) {
            setLoading(false);
            ErrorToast("Please select a valid image file (JPEG, PNG, GIF, or JPG).");
            return;
        }

        // Check image size
        const imageSize = data.image[0].size / 1024; // in KB
        if (imageSize > 1000) {
            setLoading(false);
            ErrorToast("Image size exceeds 1000KB limit.");
            return;
        }

        const formData = new FormData();
        formData.append("image", data.image[0]);
        formData.append("targetLink", 'directLink');

        try {
            const response = await axiosSecure.post("/public/upload", formData);
            await axiosSecure.patch(`/api/v1/web/user/job/final/claim/${isWebUser?.user?.id}`, { jobId: job._id, prof2: response.data.imageUrl, subTime2: getCurrentDateTime() })
                .then(data => {
                    if (data.data.modifiedCount > 0) {
                        setUpload2(false);
                        setUpload1(false);
                        setLoading(false);
                        SuccessToast('Submit Success');
                        reset();
                        setTimeout(() => {
                            navigate('/user/auth/dashboard/job');
                        }, 2000);
                    } else {
                        setLoading(false);
                        ErrorToast(data.data.Error);
                    }
                });
        } catch (error) {
            setLoading(false);
            console.error(error);
        }
    }

    const handleJobCreate = async (jobId) => {
        setLoading(true)
        try {
            await axiosSecure.post(`${import.meta.env.VITE_BASE_URL}/api/v1/web/user/job/claim/${isWebUser?.user?.id}`, { jobId, visitTime: getCurrentDateTime() })
                .then(data => {
                    console.log(data)
                    if (data.data.acknowledged === true) {
                        setLoading(false)
                        setVisitClick(true)
                        setUpload1(true)
                    } else {
                        setLoading(false)
                        ErrorToast(data.data.Error)
                    }
                })

        } catch (error) {
            setLoading(false)
        }

    }

    return (
        <>
            {loading && <ScreenLoad></ScreenLoad>}
            <div className='max-w-screen-sm mx-auto flex justify-center items-center my-10'>
                <div className="card card-compact bg-base-100 shadow-xl w-full border drop-shadow-xl">
                    <figure><img src={job.img} className="w-full" alt="Shoes" /></figure>
                    <div className="card-body">
                        <h2 className="card-title line-clamp-1">{job.title}</h2>
                        <div className="flex justify-center items-center bg-slate-100 p-2 gap-1 rounded-lg">
                            <p className="badge font-bold">T.Vacancy: {job.vacancy}</p>
                            <p className="badge text-red-600">Available: {job.vacancy - job.attempt}</p>
                        </div>
                        <p className='text-center font-bold text-red-600 border border-dashed border-red-600 bg-red-50 p-2 rounded-xl'>এই ট্যাবটি কেটে দেবেন না। এই জবটি আর পুনাইরাই করতে পারবেন না। </p>
                        <p className="flex items-center gap-2  text-slate-500"><MdPriceCheck></MdPriceCheck> Job Price: <span className="text-black">{job.jobPrice}</span></p>
                        <p className="flex items-center gap-2  text-slate-500"><MdDateRange></MdDateRange> Published Date: <span className="text-black">{job.published}</span></p>
                        <p className='text-center text-red-600 font-bold text-2xl my-4'>--- নির্দেশনা ---</p>
                        <div className='w-full grid grid-cols-1 gap-2 mb-4'>
                            {
                                job?.description?.map((details, index) => <div
                                    className='flex items-center gap-2'
                                    key={index}
                                >
                                    <p className='font-bold flex items-center hover:text-red-600 cursor-pointer'>{index + 1} <MdArrowForward></MdArrowForward></p>
                                    <div className='border border-dashed p-2 w-full hover:bg-slate-100 cursor-pointer text-justify'>{details.text}</div>
                                </div>)
                            }
                        </div>

                        <div className="card-actions w-full">
                            <button onClick={() => handleJobCreate(job._id)} className={`${!visitClick ? 'block' : 'hidden'} px-14 text-base w-full text-center  bg-[#18BE71] hover:bg-[#54e7a3] py-2 text-white font-semibold rounded-full cursor-pointer`}>Apply Now</button>
                        </div>

                        {/* Upload 1 Section */}
                        {upload1 ?
                            <>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                        <div className='flex flex-col border border-dashed p-2'>
                                            <label className='font-bold'>ScreenShort 1 <span className='text-red-600'>Max size 500kb</span></label>
                                            <div className='flex justify-between'>
                                                <input
                                                    type="file"
                                                    {...register("image", { required: true })}
                                                    name="image" // Add the name attribute
                                                    className="file-input file-input-bordered w-full max-w-xs"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-actions w-full">
                                        <button type="submit" className="px-14 text-base w-full text-center  bg-[#18BE71] hover:bg-[#54e7a3] py-2 text-white font-semibold rounded-full cursor-pointer">Upload Now</button>
                                    </div>
                                </form>
                            </>
                            : <>

                            </>
                        }
                        {/* Upload 1 Section */}
                        {upload2 ?
                            <>
                                <form onSubmit={handleSubmit(onSubmit1)}>
                                    <div>
                                        <div className='flex flex-col border border-dashed p-2'>
                                            <label className='font-bold'>ScreenShort 2 <span className='text-red-600'>Max size 500kb</span></label>
                                            <div className='flex justify-between'>
                                                <input
                                                    type="file"
                                                    {...register("image", { required: true })}
                                                    name="image" // Add the name attribute
                                                    className="file-input file-input-bordered w-full max-w-xs"
                                                />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="card-actions w-full">
                                        <button type="submit" className="px-14 text-base w-full text-center  bg-[#18BE71] hover:bg-[#54e7a3] py-2 text-white font-semibold rounded-full cursor-pointer">Submit Now</button>
                                    </div>
                                </form>
                            </>
                            : <>
                                <div className="flex flex-col gap-4 my-4">
                                    <div className="skeleton h-32 w-full"></div>
                                    <div className="skeleton h-4 w-28"></div>
                                    <div className="skeleton h-4 w-full"></div>
                                    <div className="skeleton h-4 w-full"></div>
                                </div>
                            </>
                        }
                    </div>
                </div>
                <ToastContainer></ToastContainer>
            </div>
        </>
    );
};

export default WorkInfo;