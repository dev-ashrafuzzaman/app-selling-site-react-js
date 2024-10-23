import React from "react";
import Marquee from "react-fast-marquee";
import android from "../../../assets/image/android.png";
const HeadNotice = ({ notice }) => {
  return (
    <div className="relative">
      <div className="flex justify-start items-center my-6 w-full">
        <div className="bg-red-600 p-2 text-xl font-bold text-white rounded-s-lg ">
          নোটিশ:
        </div>
        <div className="bg-red-50 p-2 rounded-e-lg text-black text-xl w-full">
          <Marquee>{notice}</Marquee>
        </div>
      </div>

      <div className="fixed bottom-0 z-10">
        <div className="flex justify-center items-center h-screen">
          <a href="https://fasterappmaker.com/apk/fasterappmaker.apk" download  className="relative w-14 text-white font-semibold  rounded-lg shadow-md transform hover:scale-110 transition-transform duration-300 ease-in-out hover:shadow-lg focus:outline-none focus:ring-4 focus:ring-blue-300 animation-color-change">
            <div className="flex items-center">
              <img src={android} alt="" />
            </div>
            <div className="absolute top-0 left-0 w-full h-full opacity-0 transition-opacity duration-500 hover:opacity-30"></div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default HeadNotice;
