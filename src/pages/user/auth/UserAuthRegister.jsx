import axios from 'axios';
import {  useState } from 'react';
import { ToastContainer } from 'react-toastify';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { ErrorToast, SuccessToast } from '../../../utils/Toastify';
import ScreenLoad from '../../../components/ScreenLoad';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { softInfo } from '../../../utils/info';

const UserAuthRegister = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [focusName, setFocusName] = useState(false)
    const [focusEmail, setFocusEmail] = useState(false)
    const [focusphone, setFocusphone] = useState(false)
    const [focusPass, setFocusPass] = useState(false)
    const [focusConPass, setFocusConPass] = useState(false)
    const [focusCheckBox, setFocusCheckBox] = useState(false)
    const [visiblePass, setvisiblePass] = useState(false)
    const [visibleConPass, setvisibleConPass] = useState(false)
    const [lodding, setLodding] = useState(false);



    const handleOnFocusName = (value) => {
        setFocusName(value)
    }
    const handleOnFocusEmail = (value) => {
        setFocusEmail(value)
    }
    const handleOnFocusphone = (value) => {
        setFocusphone(value)
    }

    const handleOnFocusPass = (value) => {
        setFocusPass(value)
    }
    const handleOnFocusConPass = (value) => {
        setFocusConPass(value)
    }
    const handleOnFocusCheckBox = (value) => {
        if (value) {
            setFocusCheckBox(true)
        } else {
            setFocusCheckBox(false)
        }
    }
    const handlePassVisible = (value) => {
        setvisiblePass(value)
    }
    const handlePassConVisible = (value) => {
        setvisibleConPass(value)
    }

    const onSubmit = async (data) => {
        try {
            const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/v1/web/user/register`, {
                email: data.email,
                phone: data.phone, password: data.password,
                name: data.name, 
            });

            setLodding(true)
            if (response.data.auth === true) {
                SuccessToast('Account Create Success')
                setTimeout(() => {
                    navigate('/user/auth/login');
                    setLodding(false)
                }, 1000)
            } else {
                setTimeout(() => {
                    ErrorToast(response.data.Error)
                    setLodding(false)
                }, 1000)
            }
        } catch (error) {
            setTimeout(() => {
                ErrorToast('Server Error!')
                setLodding(false)
            }, 1000)
        }
    }

    return (
        <>
            <div>
                {lodding && <ScreenLoad></ScreenLoad>}
            </div>
            <div className="flex justify-center pt-10 md:pb-44 pb-10 px-2 md:px-0">
                <div className="card shadow-2xl bg-base-100 md:p-10 w-[700px]">
                    <div className="card-body">
                        <div className="text-center space-y-4">
                            {/* <h3 className="md:text-4xl text-2xl font-bold mainText">Sign Up</h3> */}
                            <h4 className="md:text-xl text-slate-400">Enter your credentials to continue</h4>
                        </div>

                        <p className="text-center  font-semibold mb-6">Sign Up with Email address</p>
                        {/* Form start */}
                        <form onSubmit={handleSubmit(onSubmit)}>
                            {/* Type Name */}

                            <p className={`text-slate-400   ${focusName ? 'text-blue-500 ' : ''}`}>Name</p>
                            <div className={`border-2 rounded-xl p-2 text-sm mb-4  bg-[#F8FAFC]  ${focusName ? 'border-[#106a4f] hover:border-[#106a4f]' : 'hover:border-black '}`}>
                                <input {...register("name")} onFocus={() => handleOnFocusName(!focusName)} onBlur={() => handleOnFocusName(!focusName)} type="text" placeholder="Your Name" className="font-semibold border-none outline-none  w-full" />
                            </div>

                            {/* Type Email */}
                            <p className={`text-slate-400 ${errors.email && 'text-red-500'}  ${focusEmail ? 'text-blue-500 ' : ''}`}>Email Address</p>
                            <div className={`border-2 rounded-xl p-2 text-sm mb-4 bg-[#F8FAFC] ${errors.email && 'border-red-500 hover:border-red-500'} ${focusEmail ? 'border-[#106a4f] hover:border-[#106a4f]' : 'hover:border-black '}`}>
                                <input {...register("email", { required: true })} onFocus={() => handleOnFocusEmail(!focusEmail)} onBlur={() => handleOnFocusEmail(!focusEmail)} type="email" placeholder="Your Email" className="font-semibold border-none outline-none  w-full" />
                            </div>
                            {errors.email && <span className=" text-red-600">Email is required</span>}

                            {/* Type Phone */}
                            <p className={`text-slate-400 ${errors.phone && 'text-red-500'}  ${focusphone ? 'text-blue-500 ' : ''}`}>Phone</p>
                            <div className={`border-2 rounded-xl p-2 text-sm mb-4 bg-[#F8FAFC] ${errors.phone && 'border-red-500 hover:border-red-500'} ${focusphone ? 'border-[#106a4f] hover:border-[#106a4f]' : 'hover:border-black '}`}>
                                <input {...register("phone", { required: true, minLength: 11, maxLength: 11 })} onFocus={() => handleOnFocusphone(!focusphone)} onBlur={() => handleOnFocusphone(!focusphone)} type="number" placeholder="Your phone" className="font-semibold border-none outline-none  w-full" />
                            </div>
                            {errors.phone && <span className=" text-red-600">phone is required</span>}
                            {/* Password */}
                            <p className={`text-slate-400 ${errors.password && 'text-red-500'}  ${focusPass ? 'text-blue-500 ' : ''}`}>Password</p>
                            <div className={`border-2 flex mb-4 justify-between items-center rounded-xl p-2 text-sm bg-[#F8FAFC] ${errors.password && 'border-red-500 hover:border-red-500'} ${focusPass ? 'border-[#106a4f] hover:border-[#106a4f]' : 'hover:border-black '} ${focusPass === 'notMatch' && 'border-red-500 hover:border-red-500'}`}>
                                <div className="w-11/12">
                                    <input onFocus={() => handleOnFocusPass(!focusPass)} onBlur={() => handleOnFocusPass(!focusPass)} type={`${visiblePass ? 'text' : 'password'}`} placeholder="Your Password" className="font-semibold border-none outline-none  w-full"
                                        {...register("password", {
                                            required: true,
                                            minLength: 6,
                                            maxLength: 20
                                        })}
                                    />
                                </div>
                                <p className="text-2xl" onClick={() => handlePassVisible(!visiblePass)}>{visiblePass ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}</p>
                            </div>
                            {errors.password?.type === 'required' && <span className=" text-red-600">Password is required</span>}
                            {errors.password?.type === 'minLength' && <span className=" text-red-600">Password must be minumum 6 characters</span>}
                            {errors.password?.type === 'maxLength' && <span className=" text-red-600">Password must be less then 20 characters</span>}
                            {errors.password?.type === 'pattern' && <span className=" text-red-600">Please Enter capital letter & special character</span>}
                            {/* Confirm Password */}
                            <p className={`text-slate-400 ${errors.confirmPassword && 'text-red-500'}  ${focusConPass ? 'text-blue-500 ' : ''}`}>Confirm Password</p>
                            <div className={`border-2 flex mb-4 justify-between items-center rounded-xl p-2 text-sm bg-[#F8FAFC] ${errors.confirmPassword && 'border-red-500 hover:border-red-500'} ${focusConPass ? 'border-[#106a4f] hover:border-[#106a4f]' : 'hover:border-black '} ${focusConPass === 'notMatch' && 'border-red-500 hover:border-red-500'}`}>
                                <div className="w-11/12">
                                    <input onFocus={() => handleOnFocusConPass(!focusConPass)} onBlur={() => handleOnFocusConPass(!focusConPass)} type={`${visibleConPass ? 'text' : 'password'}`} placeholder="Confirm Password" className="font-semibold border-none outline-none  w-full"
                                        {...register("confirmPassword", {
                                            required: true,
                                        })}
                                    />
                                </div>
                                <p className="text-2xl" onClick={() => handlePassConVisible(!visibleConPass)}>{visibleConPass ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}</p>
                            </div>

                            {errors.confirmPassword?.type === 'required' && <span className=" text-red-600">Passwords are not same</span>}
                            {/* Type referId */}
                       

                            {/* Forgot Password Area */}
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <input type="checkbox" onChange={() => handleOnFocusCheckBox(!focusCheckBox)} checked={focusCheckBox} className="checkbox" />
                                    <span>Agree with <a className="underline hover:text-[#ec5050]" href="">Terms & Condition</a></span>
                                </div>
                            </div>
                            {/* Submit Btn */}
                            <div>
                                <input className={`text-end btn w-full mt-4 font-bold  text-xl ${softInfo.btn} text-white`} type="submit" disabled={!focusCheckBox} value="Sign Up" />
                            </div>
                        </form>
                        <div className="divider"></div>
                        <Link to='/user/auth/login'> <p className="font-semibold text-center text-sm hover:text-[#ec5050]">{`Already have an account?`}</p></Link>
                    </div>
                </div>
                <ToastContainer></ToastContainer>
            </div>
        </>
    );
};

export default UserAuthRegister;