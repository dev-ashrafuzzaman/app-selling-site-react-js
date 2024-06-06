import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
const Footer = () => {
  return (
    <div className="bg-red-600 py-6 px-2 lg:px-10 cursor-pointer rounded-t-3xl mt-10">
      <div className="grid md:grid-cols-4 grid-cols-2 md:gap-4 text-white">
        <div className="col-span-2 md:col-span-1 md:mb-6  text-center">
          <h1 className="text-2xl md:text-3xl font-bold">FASTER APP MAKER</h1>
          <div className="flex items-center justify-center gap-3  mt-4  md:text-3xl">
            <a href="">
              <FaFacebook />
            </a>
            <a href="">
              <FaTwitter />
            </a>
            <a href="">
              <FaInstagram />
            </a>
            <a href="">
              <FaYoutube />
            </a>
          </div>
        </div>
        <div className="md:block hidden">
          <h1 className="text-xl md:text-3xl font-bold">সাপোর্ট</h1>
          <div className="mt-4 md:text-xl space-y-4">
            <p>প্রশ্ন</p>
            <p>রিটার্ন & এক্সচেঞ্জ</p>
            <p>শিপিং</p>
            <p>সাইজ চার্টস</p>
          </div>
        </div>
        <div className="md:block hidden">
          <h1 className="text-xl md:text-3xl font-bold">লিগ্যাল</h1>
          <div className="mt-4 md:text-xl space-y-4">
            <p>কুকিজ পলিসি</p>
            <p>টার্মস & কন্ডিশনস</p>
            <p>প্রাইভেসি পলিসি</p>
            <p>আমাদের সম্পর্কে</p>
          </div>
        </div>
        <div className="md:block hidden">
          <h1 className="text-xl md:text-3xl font-bold">যোগাযোগ</h1>
          <div className="mt-4 md:text-xl space-y-4">
            <p>ঢাকা , বাংলাদেশ</p>
            <p>info@fasterappmaker.com</p>
            <p>+৮৮০২৫২৫২২৫৫</p>
            <p>+৮৮০১৭১১৩৪২২৫৫</p>
          </div>
        </div>
      </div>
      {/* <div className="mt-4">
        <Image src={sslPay} alt="SSL PAY"></Image>
      </div> */}
      {/* <div className="text-center text-xs text-slate-300 p-4 border-t border-t-slate-600 mt-4">
        <p>© MA SOFT 2024 দ্বারা FasterAppMaker সর্বস্বত্ব সংরক্ষিত</p>
      </div> */}
    </div>
  );
};

export default Footer;
