import { Outlet, useNavigate } from 'react-router-dom';
import { MdEmail, MdLogout, MdVerified } from 'react-icons/md';
import { FaBell, FaUsers } from 'react-icons/fa';
import useAuth from '../../hooks/useAuth';
import { softInfo } from '../../utils/info';
import { HandleLogout } from '../../utils/HandleLogout';

const WebNavbar = ({ toggled, setToggled, isWebUser }) => {
    const { WebUserLogout } = useAuth();
    const navigate = useNavigate();

    return (
        <div className='w-full'>
            <div className="w-full navbar bg-white shadow-md border rounded-b-3xl">
                <div className="flex-none lg:hidden">
                    <label htmlFor="my-drawer-3" aria-label="open sidebar" className="btn btn-square btn-ghost" onClick={() => setToggled(!toggled)}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-6 h-6 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path></svg>
                    </label>
                </div>
                <div className="flex-1 px-2 mx-2 justify-between">
                    <label className="input input-bordered md:flex items-center gap-2 hidden">
                        <input type="text" className="grow" placeholder="Search" />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
                    </label>

                    <div className='md:hidden block text-indigo-800 font-bold '>
                        <p className='text-xs'>{softInfo.name}</p>
                    </div>
                    <div className="dropdown dropdown-end md:hidden block">
                        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                            <div className="w-8 rounded-full border border-indigo-800">
                                <img className="w-[40px] rounded-full" src={'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'} alt="User Image" />
                            </div>
                        </label>
                        <ul tabIndex={0} className="menu menu-sm text-indigo-800 dropdown-content mt-3 z-[10] p-2 border bg-white shadow-md rounded-box w-64">
                            <li>
                                <a className="justify-between">
                                    <p className="flex justify-center items-center gap-2"><FaUsers></FaUsers> {isWebUser} <MdVerified className='text-blue-500'></MdVerified></p>
                                </a>
                            </li>
                            <li onClick={() => HandleLogout(WebUserLogout, navigate)}><a><p className="flex justify-center items-center gap-2"><MdLogout></MdLogout>লগ আউট</p></a></li>
                        </ul>
                    </div>

                </div>

                <div className="flex-none hidden lg:block">
                    <ul className="menu menu-horizontal items-center gap-4">
                        {/* Navbar menu content here */}
                        <a href='/' className='btn btn-sm'>Website</a>
                        <MdEmail className='text-indigo-800'></MdEmail>
                        <FaBell className='text-indigo-800'></FaBell>
                        <div className="dropdown dropdown-end">
                            <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                                <div className="w-8 rounded-full border border-indigo-800">
                                    <img className="w-[40px] rounded-full" src={'https://cdn-icons-png.flaticon.com/128/3135/3135715.png'} alt="User Image" />
                                </div>
                            </label>
                            <ul tabIndex={0} className="menu menu-sm text-indigo-800 dropdown-content mt-3 z-[10] p-2 border bg-white shadow-md rounded-box w-64">
                                <li>
                                    <a className="justify-between">
                                        <p className="flex justify-center items-center gap-2"><FaUsers></FaUsers> {isWebUser} <MdVerified className='text-blue-500'></MdVerified></p>
                                    </a>
                                </li>
                                <li onClick={() => HandleLogout(WebUserLogout, navigate)}><a><p className="flex justify-center items-center gap-2"><MdLogout></MdLogout>লগ আউট</p></a></li>
                            </ul>
                        </div>
                    </ul>
                </div>
            </div>
            <div className='px-2'>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default WebNavbar;