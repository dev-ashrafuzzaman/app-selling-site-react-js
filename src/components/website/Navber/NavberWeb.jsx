import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import { MdLogin, MdLogout } from "react-icons/md";
import { HandleLogout } from "../../../utils/HandleLogout";
import { FaRegistered } from "react-icons/fa";

const NavberWeb = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { WebUser, WebUserLogout } = useAuth();
  const navigate = useNavigate();

  const handleDropdownToggle = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleMenuItemClick = () => {
    setIsDropdownOpen(false);
  };

  return (
    <div className="max-w-screen-2xl mx-auto">
      <div className="navbar bg-base-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
              onClick={handleDropdownToggle}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h8m-8 6h16"
                />
              </svg>
            </div>
            {isDropdownOpen && (
              <ul
                tabIndex={0}
                className="menu border text-xl border-red-200 space-y-3 menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52">
                <li className="btn btn-error btn-sm text-white">
                  <a onClick={handleMenuItemClick}>সকল সফটওয়্যার</a>
                </li>
                <li className="btn btn-error btn-sm text-white">
                  <a onClick={handleMenuItemClick}>এপস</a>
                </li>
                <li className="btn btn-error btn-sm text-white">
                  <a onClick={handleMenuItemClick}>ওয়েবসাইট</a>
                </li>
              </ul>
            )}
          </div>
          <a href="/" className="md:text-xl text-xs font-bold">
            FASTER APP MAKER
          </a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal text-xl px-1">
            <li>
              <a>সকল সফটওয়্যার</a>
            </li>
            <li>
              <a>এপস</a>
            </li>
            <li>
              <a>ওয়েবসাইট</a>
            </li>
          </ul>
        </div>

        {/* Cart Area */}
        <div className="navbar-end">
          {/* Profile */}
          <div className="dropdown dropdown-end ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost md:btn-lg btn-sm btn-circle avatar ">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52">
              {WebUser ? (
                <>
                  <li>
                    <Link
                      to={"/user/auth/dashboard/home"}
                      className="justify-between">
                      ড্যাশবোর্ড
                      <span className="badge">New</span>
                    </Link>
                  </li>
                  <li onClick={() => HandleLogout(WebUserLogout, navigate)}>
                    <a>
                      <p className="flex justify-center items-center gap-2">
                        <MdLogout></MdLogout>লগ আউট
                      </p>
                    </a>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/user/auth/login"
                      className="flex  items-center gap-2">
                      <MdLogin></MdLogin>লগইন
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/user/auth/register"
                      className="flex  items-center gap-2">
                      <FaRegistered></FaRegistered>রেজিস্টার
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavberWeb;
