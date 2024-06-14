import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ErrorToast, SuccessToast } from "../../../utils/Toastify";
import { ToastContainer } from "react-toastify";
import SectionTitle from "../../../components/SectionTitle";
import { softInfo } from "../../../utils/info";
import { useState } from "react";

const AddJob = () => {
    const { register, handleSubmit, reset } = useForm();
    const [axiosSecure] = useAxiosSecure();
    const navigate = useNavigate();

    const [inputText, setInputText] = useState('');
    const [description, setDescription] = useState([]);
    const handleChange = (e) => {
        setInputText(e.target.value);
    };

    const handleAdd = () => {
        if (inputText.trim() !== '') {
            setDescription([...description, { text: inputText }]);
            setInputText('');
        }
    };

    const onSubmit = async (data) => {
        if(description.length > 0 && data.img) {
            try {
                const job = {
                    title: data.title,
                    vacancy: parseInt(data.vacancy),
                    attempt: parseInt(0),
                    img: data.img,
                    jobPrice: parseInt(data.jobPrice),
                    description,
                    status: true,
                };
    
                await axiosSecure.post("/api/v1/admin/job/", { job })
                    .then(data => {
                        if (data.data.insertedId) {
                            SuccessToast('Create Success')
                            reset();
                            setTimeout(() => {
                                navigate('/leery/admin/dashboard/manage-job');
                            }, 2000)
    
                        }
                    });
    
            } catch (error) {
                console.error(error);
            }
        } else {
            ErrorToast('Please Add description')
        }
     
    };

    return (
        <div className="w-full py-10 md:px-10 px-2">
            <ToastContainer></ToastContainer>
            <SectionTitle heading={'Add Job'}></SectionTitle>
            <div className=" bg-[#F0F3F4] rounded-xl md:p-10 p-4">
                <div className="my-4 space-y-4">
                    <div className="md:flex gap-6">
                        <input type="text" value={inputText} onChange={handleChange} placeholder="Enter description" className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                        <button className="btn btn-success text-white" onClick={handleAdd}>Add</button>
                    </div>
                    <ul className="grid grid-cols-1 space-y-4">
                        {description.map((item, index) => (
                            <li key={index}>{index + 1} <span className="border-2 p-1 border-dashed border-white rounded-xl">{item.text}</span></li>
                        ))}
                    </ul>
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
                                <span className="label-text">Job Amount*</span>
                            </label>
                            <input type="text" defaultValue={0} placeholder="Type here Amount" {...register("jobPrice")} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                        </div>
                    </div>
                    <div className="md:flex gap-6">

                        <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                            <label className="label">
                                <span className="label-text">Img Link*</span>
                            </label>
                            <input type="text" placeholder="Image Link" {...register("img", { required: true })} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                        </div>
                        <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                            <label className="label">
                                <span className="label-text">Vacancy*</span>
                            </label>
                            <input type="number" placeholder="Enter Vacancy" defaultValue={0} {...register("vacancy")} className="input input-bordered w-full md:max-w-screen-2xl max-w-xs" />
                        </div>
                    </div>
                    <div className='flex justify-end items-center'>
                        <button type="submit" className={`py-2 btn  rounded  font-semibold text-white mt-6 md:w-[200px] w-full ${softInfo.btn}`}>
                            Add Job
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddJob;