import { useState } from "react";
import useUserSecure from "../../../../hooks/web/useUserSecure";
import useWebUser from "../../../../hooks/web/useWebUser";
import { HandlePassChange } from "../../../../utils/WebUsers/HandlePasswordChange";
import useAuth from "../../../../hooks/useAuth";
import { ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ChangePassword = () => {
    const { WebUserLogout } = useAuth();
    const [isWebUser] = useWebUser();
    const [axiosSecure] = useUserSecure();
    const navigate = useNavigate()
    const [passValues, setValues] = useState({
        oldPass: '',
        newPass: '',
    })
    return (
        <>
            <div className="max-w-screen-sm mx-auto my-10 drop-shadow-lg bg-white p-4 rounded-xl">
                <div className="space-y-3">
                    <h3 className="font-bold text-lg text-center">Change Password</h3>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input type="password" required name="oldPass" placeholder="Enter old password" className="grow"
                            onChange={e => setValues({ ...passValues, oldPass: e.target.value })} />
                    </label>
                    <label className="input input-bordered flex items-center gap-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z" clipRule="evenodd" /></svg>
                        <input type="password" required name="newPass" placeholder="Enter New password" className="grow"
                            onChange={e => setValues({ ...passValues, newPass: e.target.value })} />
                    </label>
                    <div className="flex items-center gap-4 w-full">
                        <button onClick={() => HandlePassChange(axiosSecure, isWebUser?.user?.id, passValues, WebUserLogout, navigate)} className="btn btn-success text-white w-full">Change Password</button>
                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </>
    );
};

export default ChangePassword;