import React from "react";
import { FaTelegram, FaWhatsapp, FaYoutube } from "react-icons/fa";
const ContactSection = ({ telegram, whatsapp, youtube }) => {
  return (
    <div className="grid grid-cols-3 gap-5">
      <a href={youtube} target="_blank">
        <div className="bg-red-50  p-4 rounded-xl flex justify-center items-center text-4xl  border border-red-50 hover:border-red-500">
          <FaYoutube className="text-red-500"></FaYoutube>
        </div>
      </a>
      <a href={whatsapp} target="_blank">
        <div className="bg-green-50  p-4 rounded-xl flex justify-center items-center text-4xl  border border-green-50 hover:border-green-500">
          <FaWhatsapp className="text-green-500"></FaWhatsapp>
        </div>
      </a>
      <a href={telegram} target="_blank">
        <div className="bg-blue-50  p-4 rounded-xl flex justify-center items-center text-4xl border border-blue-50 hover:border-blue-500">
          <FaTelegram className="text-blue-500"></FaTelegram>
        </div>
      </a>
    </div>
  );
};

export default ContactSection;
