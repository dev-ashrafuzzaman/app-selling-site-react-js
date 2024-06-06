import React from "react";
import Marquee from "react-fast-marquee";

const HeadNotice = () => {
  return (
    <div className="flex justify-start items-center my-6">
      <div className="bg-red-600 p-2 text-xl font-bold text-white rounded-s-lg">
        নোটিশ:
      </div>
      <div className="bg-red-50 p-2 rounded-e-lg text-black text-xl w-full">
        <Marquee>{'২৫333 এই নম্বর এ। যেকোনো সহযোগিতা জন্য ম্যাসেজ করুন আমাদের নম্বরে। আমাদের সকল ধরনের এপপ্স এন্ড ওয়েবসাইট কোড কিনতে পারবেন এবং নতুন '}</Marquee>
      </div>
    </div>
  );
};

export default HeadNotice;