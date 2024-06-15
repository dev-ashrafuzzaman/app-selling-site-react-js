import React from "react";
import Marquee from "react-fast-marquee";

const HeadNotice = ({notice}) => {
  return (
    <div className="flex justify-start items-center my-6 w-full">
      <div className="bg-red-600 p-2 text-xl font-bold text-white rounded-s-lg ">
        নোটিশ:
      </div>
      <div className="bg-red-50 p-2 rounded-e-lg text-black text-xl w-full">
        <Marquee>{notice}</Marquee>
      </div>
    </div>
  );
};

export default HeadNotice;