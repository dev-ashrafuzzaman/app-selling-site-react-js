import { useState } from "react";
import {useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { FaFacebook, FaGoogle, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { useForm } from 'react-hook-form';
import useAuth from "../../hooks/useAuth";
import { ErrorToast } from "../../utils/Toastify";
import ScreenLoad from "../../components/ScreenLoad";
import './Login.css'
import { softInfo } from "../../utils/info";

const Login = () => {
    const [lodding, setLodding] = useState(false);
    const { register, handleSubmit } = useForm();
    const { loginUser } = useAuth();
    const navigate = useNavigate();
    const [values, setValues] = useState({
        name: '',
        email: '',
        password: ''
    })

    const handleSubmitForm = async (event) => {
        event.preventDefault();
        try {
            const res = await loginUser(values.email, values.password);
            if (res._tokenResponse.registered === true) {
                setLodding(true)
                setTimeout(() => {
                    navigate('/leery/admin/dashboard/home')
                    setLodding(false)
                }, 2000)
            } else {
                setLodding(true)
                setTimeout(() => {
                    ErrorToast(res.data.Error)
                    setLodding(false)
                }, 1000)
            }
        } catch (error) {
            setLodding(true)
            setTimeout(() => {
                ErrorToast('Wrong Email/Password try again!')
                setLodding(false)
            }, 1000)
        }
    }
    const onSubmit = (data) => {
        loginUser(data.email, data.password)
            .then(res => {
                if (res._tokenResponse.registered === true) {
                    setLodding(true)
                    setTimeout(() => {
                        navigate('/leery/admin/dashboard/home')
                        setLodding(false)
                    }, 2000)
                } else {
                    setLodding(true)
                    setTimeout(() => {
                        ErrorToast(res.data.Error)
                        setLodding(false)
                    }, 1000)

                }
            })
            .catch(() => {
                setLodding(true)
                setTimeout(() => {
                    ErrorToast('Wrong Email/Password try again!')
                    setLodding(false)
                }, 1000)
            })
    }

    return (
        <>
            <div className="hidden md:block">
                {lodding && <ScreenLoad></ScreenLoad>}
                <div className="login-body">
                    <div className="container" id="container">
                        <div className="form-container sign-in">
                            <form onSubmit={handleSubmitForm}>
                                <h1 className="font-bold text-2xl">Sign In</h1>
                                <div className="social-icons">
                                    <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"><FaGoogle></FaGoogle></i></a>
                                    <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"><FaFacebook></FaFacebook></i></a>
                                    <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"><FaLinkedin></FaLinkedin></i></a>
                                    <a href="#" className="icon"><i className="fa-brands fa-google-plus-g"><FaYoutube></FaYoutube></i></a>
                                </div>
                                <span>Enter your email & password</span>
                                <input type="email" required placeholder="Email" name="email" autoComplete="email" autoSave="email"
                                    onChange={e => setValues({ ...values, email: e.target.value })} />
                                <input type="password" required placeholder="Password" name="password"
                                    onChange={e => setValues({ ...values, password: e.target.value })} />
                                <a href="#">Forget Your Password?</a>
                                <button type="submit">Sign in</button>
                            </form>
                        </div>
                        <div className="toggle-container hidden md:block">
                            <div className="toggle">
                                <div className="toggle-panel toggle-right WhatsApp">
                                    <h1 className="font-bold text-2xl">Welcome Back!</h1>
                                    <h6 className="text-sm font-semibold">{softInfo?.name}</h6>
                                    <p className="text-xs">Enter your details to use all of site features</p>
                                    {/* <p className="text-white font-bold"><a className="hover:text-orange-200" href="//api.whatsapp.com/send?phone=+8801711347754&text=Dear Ashrafuzzaman,
I hope this message finds you well. I wanted to reach out to express my interest in Leery iT Management Software. I've heard positive things about its capabilities and would love to learn more about how it can benefit our operations.
Looking forward to discussing further.">WhatsApp: +8801711 347 754</a></p> */}
                                    {/* <button className="hidden" id="login">Sign In</button> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* Mobile View */}
            <div className="md:hidden block">
                {lodding && <ScreenLoad></ScreenLoad>}
                <div className=" login-body px-2">
                    <div className="mobile-container py-10 ">
                        <form onSubmit={handleSubmit(onSubmit)} className="flex justify-center items-center flex-col px-1">
                            <h1 className="font-bold text-2xl">Sign In</h1>
                            <span>Enter your email & password</span>
                            <input type="email" placeholder="Email" name="email"
                                {...register("email", { required: true })} ></input>
                            <input type="password" placeholder="password" name="password"
                                {...register("password", { required: true })}></input>
                            <a href="#">Forget Your Password?</a>
                            <button type="submit">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer />
        </>
    );
};

export default Login;