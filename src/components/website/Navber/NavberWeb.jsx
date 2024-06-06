import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const NavberWeb = () => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
              onClick={handleDropdownToggle}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
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
                className="menu border border-red-200 space-y-3 menu-sm dropdown-content mt-3 z-[10] p-2 shadow bg-base-100 rounded-box w-52"
              >
                <li className="btn btn-error btn-sm text-white">
                  <a onClick={handleMenuItemClick}>সকল সফটওয়্যার</a>
                </li>
                <li className="btn btn-error btn-sm text-white">
                  <a onClick={handleMenuItemClick}>এপস</a>
                </li>
                <li className="btn btn-error btn-sm text-white">
                  <a onClick={handleMenuItemClick}>ওয়েবসাইট</a>
                </li>
                <li className="btn btn-error btn-sm text-white">
                  <Link to='/user/auth/register' onClick={handleMenuItemClick}>রেজিস্টার</Link>
                </li>
                <li className="btn btn-error btn-sm text-white">
                  <Link to='/user/auth/login' onClick={handleMenuItemClick}>লগইন</Link>
                </li>
              </ul>
            )}
          </div>
          <a href='/' className="md:text-xl text-xs font-bold">FASTER APP MAKER</a>
        </div>
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1">
            <li>
              <a>সকল সফটওয়্যার</a>
            </li>
            <li>
              <a>এপস</a>
            </li>
            <li>
              <a>ওয়েবসাইট</a>
            </li>
            <li>
              <a>রেজিস্টার</a>
            </li>
            <li>
              <a>লগইন</a>
            </li>
          </ul>
        </div>

        {/* Cart Area */}
        <div className="navbar-end ">
          <div role="button" className="btn btn-ghost btn-circle ">
            <div className="indicator">
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
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="badge badge-sm indicator-item">8</span>
            </div>
          </div>

          {/* Profile */}
          <div className="dropdown dropdown-end ">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-sm btn-circle avatar">
              <div className="w-8 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NavberWeb;
