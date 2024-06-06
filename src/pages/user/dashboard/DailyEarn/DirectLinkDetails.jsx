import { ToastContainer } from 'react-toastify';
import ScreenLoad from '../../../../components/ScreenLoad';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import useWebUser from '../../../../hooks/web/useWebUser';
import useUserSecure from '../../../../hooks/web/useUserSecure';
import { ErrorToast, SuccessToast } from '../../../../utils/Toastify';
import { getCurrentDateTime } from '../../../../utils/HandleCurrentDate';
import { useForm } from 'react-hook-form';

const DirectLinkDetails = () => {
    const info = useLoaderData();
    const [axiosSecure] = useUserSecure();
    const [loading, setLoading] = useState(false)
    const [isWebUser] = useWebUser();
    const [visitClick, setVisitClick] = useState(false);
    const navigate = useNavigate();
    const { register, handleSubmit, reset } = useForm();
    const [selectedImage, setSelectedImage] = useState(null);


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
            await axiosSecure.patch(`/api/v1/web/user/direct-link/final/claim/${isWebUser?.user?.id}`, { vId: info._id, prof: response.data.imageUrl, subTime: getCurrentDateTime() })
                .then(data => {
                    if (data.data.modifiedCount > 0) {
                        setLoading(false)
                        SuccessToast('Submit Success')
                        reset()
                        setTimeout(() => {
                            navigate('/user/auth/dashboard/direct-link');
                        }, 2000)
                    } else {
                        setLoading(false)
                        ErrorToast(data.data.Error)
                    }
                })
        } catch (error) {
            setLoading(false)
        }
    }

    const handleDirectLinkVisit = async (vId) => {
        setLoading(true)
        try {
            await axiosSecure.post(`${import.meta.env.VITE_BASE_URL}/api/v1/web/user/direct-link/claim/${isWebUser?.user?.id}`, { vId, visitTime: getCurrentDateTime() })
                .then(data => {
                    if (data.data.acknowledged === true) {
                        setLoading(false)
                        setVisitClick(true)
                        window.open(info.link, '_blank');
                    } else {
                        setLoading(false)
                        ErrorToast(data.data.Error)
                    }
                })

        } catch (error) {
            setLoading(false)
            console.error(error);
        }

    }

    const handleImage = (event) => {
        const file = event.target.files[0];
        setSelectedImage(file);
    };



    return (
        <>
            {loading && <ScreenLoad></ScreenLoad>}
            <div className='max-w-screen-sm mx-auto flex justify-center items-center my-10'>
                <div className="card card-compact bg-base-100 shadow-xl w-full border drop-shadow-xl">
                    <div className="card-body">
                        <h2 className="card-title">{info.title}</h2>

                        <p className='text-center text-red-600 font-bold text-2xl my-4'>--- নির্দেশনা ---</p>
                        <div className='w-full grid grid-cols-1 gap-2 mb-4'>
                            <div className='border border-dashed p-2 w-full hover:bg-slate-100 cursor-pointer text-justify'>{info.details}</div>
                        </div>

                        <div className='flex justify-center items-center'>
                            <p>পাশের বাটনে Click করুন </p>
                            <button onClick={() => handleDirectLinkVisit(info._id)} className={`flex justify-center items-center btn animate-bounce transition duration-700 ease-in-out btn-success text-white shadow-lg shadow-red-300 btn-sm drop-shadow-lg ${!visitClick ? 'block' : 'hidden'}`}><span>Click Now</span></button>
                        </div>

                        {/* Upload Section */}
                        {visitClick ?
                            <>
                                <form onSubmit={handleSubmit(onSubmit)}>
                                    <div>
                                        <div className='flex flex-col border border-dashed p-2'>
                                            <label className='font-bold'>ScreenShort <span className='text-red-600'>Max size 500kb</span></label>
                                            <div className='flex justify-between'>
                                                <input
                                                    onInput={handleImage}
                                                    type="file"
                                                    {...register("image", { required: true })}
                                                    name="image" // Add the name attribute
                                                    className="file-input file-input-bordered w-full max-w-xs"
                                                />
                                            </div>
                                        </div>
                                        {selectedImage && (
                                            <img
                                                src={URL.createObjectURL(selectedImage)}
                                                alt="Selected Image"
                                                className="mt-2 w-32"
                                            />
                                        )}
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
            </div>
            <ToastContainer></ToastContainer>

        </>
    );
};

export default DirectLinkDetails;