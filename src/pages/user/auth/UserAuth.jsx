import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { softInfo } from "../../../utils/info";
import { ErrorToast } from "../../../utils/Toastify";
import ScreenLoad from "../../../components/ScreenLoad";
import NavberWeb from "../../../components/website/Navber/NavberWeb";
import Footer from "../../../components/website/Footer";

const UserAuth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [lodding, setLodding] = useState(false);
  const [logError] = useState(false);
  const [focusEmail, setFocusEmail] = useState(false);
  const [focusPass, setFocusPass] = useState(false);
  const [focusCheckBox, setFocusCheckBox] = useState(false);
  const [visiblePass, setvisiblePass] = useState(false);

  const handleOnFocusEmail = (value) => {
    setFocusEmail(value);
  };
  const handleOnFocusPass = (value) => {
    setFocusPass(value);
  };
  const handleOnFocusCheckBox = (value) => {
    if (value) {
      setFocusCheckBox(true);
    } else {
      setFocusCheckBox(false);
    }
  };
  const handlePassVisible = (value) => {
    setvisiblePass(value);
  };

  const onSubmit = async (data) => {
    setLodding(true);
    const uit = localStorage.getItem("uit");
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/api/v1/web/user/login`,
        { email: data.email, password: data.password, uit }
      );
     
      if (response.data.auth === true) {
        localStorage.setItem("uid", response.data.email);
        setTimeout(() => {
          window.location.href = "/";
          setLodding(false);
        }, 2000);
      } else {
        setTimeout(() => {
          ErrorToast(response.data.Error);
          setLodding(false);
        }, 1000);
      }
    } catch (error) {
      setTimeout(() => {
        ErrorToast("Wrong Email/Password try again!");
        setLodding(false);
      }, 1000);
    }
  };

  return (
    <>
      <NavberWeb></NavberWeb>
      <div>{lodding && <ScreenLoad></ScreenLoad>}</div>
      <div className="flex justify-center   pt-28 md:pb-44 pb-10 px-2 md:px-0">
        <div className="card shadow-2xl bg-base-100 md:p-10 w-[700px]">
          <div className="card-body">
            <div className="text-center space-y-4 mb-6">
              <h3 className="md:text-4xl text-xl font-bold mainText">
                Hi, Welcome Back
              </h3>
              <h4 className="md:text-xl text-slate-400">
                Enter your credentials to continue
              </h4>
            </div>

            <p className="text-center  font-semibold my-6">
              Sign in with Email address
            </p>
            {/* Form start */}
            <form onSubmit={handleSubmit(onSubmit)}>
              <p className={`text-slate-400  ${focusEmail ? "mainText " : ""}`}>
                ইমেইল
              </p>
              <div
                className={`border-2 rounded-xl mb-4 p-2 ${
                  logError && "border-red-500 hover:border-red-500"
                }  bg-[#F8FAFC] ${
                  focusEmail
                    ? "border-[#106a4f] hover:border-[#106a4f]"
                    : "hover:border-black "
                }`}>
                <input
                  {...register("email", { required: true })}
                  onFocus={() => handleOnFocusEmail(!focusEmail)}
                  onBlur={() => handleOnFocusEmail(!focusEmail)}
                  type="email"
                  placeholder="ইমেইল"
                  className="font-semibold border-none outline-none  w-full"
                />
              </div>
              {errors.email && (
                <span className=" text-red-600">Email is required</span>
              )}
              <p className={`text-slate-400  ${focusPass ? "mainText " : ""}`}>
                পাসওয়ার্ড
              </p>
              <div
                className={`border-2 mb-4 flex justify-between items-center rounded-xl p-2 ${
                  logError && "border-red-500 hover:border-red-500"
                }  bg-[#F8FAFC] ${
                  focusPass
                    ? "border-[#106a4f] hover:border-[#106a4f]"
                    : "hover:border-black "
                }`}>
                <div className="w-11/12">
                  <input
                    {...register("password", { required: true })}
                    onFocus={() => handleOnFocusPass(!focusPass)}
                    onBlur={() => handleOnFocusPass(!focusPass)}
                    type={`${visiblePass ? "text" : "password"}`}
                    placeholder="পাসওয়ার্ড"
                    className="font-semibold border-none outline-none  w-full"
                  />
                </div>
                <p
                  className="text-2xl"
                  onClick={() => handlePassVisible(!visiblePass)}>
                  {visiblePass ? <FaEye></FaEye> : <FaEyeSlash></FaEyeSlash>}
                </p>
              </div>
              {errors.password?.type === "required" && (
                <span className=" text-red-600">Password is required</span>
              )}
              {/* Forgot Password Area */}
              {/* <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <span>Remember me</span>
                                    <input type="checkbox" onChange={() => handleOnFocusCheckBox(!focusCheckBox)} checked={focusCheckBox} className="checkbox" />
                                </div>
                                <Link><p className={`text-end text-[#EA580C]`}>Forgot Password?</p></Link>
                            </div> */}
              {/* Submit Btn */}
              <div>
                <input
                  className={`text-end btn w-full mt-4 font-bold  text-xl ${softInfo.btn} text-white`}
                  type="submit"
                  value="লগইন"
                />
              </div>
            </form>
            <div className="divider"></div>
            <Link to="/user/auth/register">
              {" "}
              <p className="font-semibold text-center text-sm hover:text-[#ec5050]">{`একটি অ্যাকাউন্ট নেই ?`}</p>
            </Link>
          </div>
        </div>
        <ToastContainer></ToastContainer>
      </div>

      <Footer></Footer>
    </>
  );
};

export default UserAuth;
