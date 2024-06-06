import { Outlet, useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { MdEmail, MdLogout } from 'react-icons/md';
import { softInfo } from '../utils/info';
import { FaBell, FaUsers } from 'react-icons/fa';
import leerylogo from '../assets/leeryit/Leery.png';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Navbar = ({ toggled, setToggled }) => {
    const { logoutUser } = useAuth();
    const navigate = useNavigate();

    const [isLicenseVerified, setIsLicenseVerified] = useState();
    const [isVerifiedLoad, setIsVerifiedLoad] = useState(true);
    const [errorMessage, setErrorMessage] = useState('');
    useEffect(() => {
        const verifyLicense = async () => {
            try {
                const id = window.location.hostname;
                console.log(id);
                const response = await axios.get(`https://sgt.nextsleek.com/software/verify/${id}`);

                if (response.data.validation) {
                    setIsLicenseVerified(response.data);
                } else {
                    setIsLicenseVerified(response.data)
                    setErrorMessage('This license key is not valid. Please contact the developer for assistance.');
                    setTimeout(() => {
                        logoutUser()
                            .then(() => {
                                navigate("/leery/admin/auth/validation")
                            })
                    }, 30000)
                }
            } catch (error) {
                console.error(error);
                setErrorMessage('An error occurred while verifying the license. Please try again later or contact the developer for assistance.');
            } finally {
                setIsVerifiedLoad(false);
            }
        };

        verifyLicense();
    }, [logoutUser, navigate]);


    const HandleLogout = () => {
        logoutUser()
            .then(() => {
                navigate("/leery/admin/auth/validation")
            })
    }

    
    return (
        <div className='w-full'>
            <div className="w-full navbar bg-white shadow-md border rounded-b-2xl">
                <div className="flex-none lg:hidden">
                    <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost" onClick={() => setToggled(!toggled)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </label>
                </div>
                <div className="flex-1 px-2 mx-2 ">
                    <label className="input input-bordered md:flex items-center gap-2 hidden">
                        <input type="text" className="grow" placeholder="Search" />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </label>

                    <div className='md:hidden block text-indigo-800 font-bold '>
                        <p>{softInfo.name}</p>
                    </div>
                </div>

                <div className="flex-none hidden lg:block">
                    <ul className="menu menu-horizontal items-center gap-4">
                        {/* Navbar menu content here */}
                        <MdEmail className='text-indigo-800'></MdEmail>
                        <FaBell className='text-indigo-800'></FaBell>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-8 rounded-full border border-indigo-800">
                                    <img className="w-[40px] rounded-full" src={leerylogo} alt="surokkha gps" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm text-indigo-800 dropdown-content mt-3 z-[1] p-2 border bg-white shadow-md rounded-box w-40">
                                <li>
                                    <a className="justify-between">
                                        <p className="flex justify-center items-center gap-2"><FaUsers></FaUsers> {"অ্যাডমিন"}</p>
                                    </a>
                                </li>
                                <li onClick={() => HandleLogout()}><a><p className="flex justify-center items-center gap-2"><MdLogout></MdLogout>লগ আউট</p></a></li>
                            </ul>
                        </div>
                    </ul>
                </div>
            </div>
            <div>
                {isVerifiedLoad && <p className='text-center my-6 '>Loading... Please Wait</p>}
                {!isVerifiedLoad && errorMessage && <div className='w-full px-2 '>
                    <div className='bg-slate-50 border-2 my-10 p-10 rounded-xl'>
                        <p className='text-center font-bold'>MA SOFTWARE Solution</p>
                        <p className='text-center font-bold my-2 text-red-500'>{errorMessage}</p>
                        <p className='text-center font-bold my-2 text-orangr-500'>Resion: {isLicenseVerified?.massage}</p>
                    </div>
                </div>}
                {
                    !isVerifiedLoad && !errorMessage && isLicenseVerified?.validation && <div className='px-2'>
                        <Outlet></Outlet>
                    </div>
                }

            </div>
        </div>
    );
};

export default Navbar;