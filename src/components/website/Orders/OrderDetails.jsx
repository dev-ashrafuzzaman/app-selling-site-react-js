import React from "react";
import NavberWeb from "../Navber/NavberWeb";
import { useLoaderData } from "react-router-dom";
import { MdDownload, MdPassword } from "react-icons/md";
import { FaLink, FaUser, FaYoutube } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import { ErrorToast, SuccessToast } from "../../../utils/Toastify";

const OrderDetails = () => {
  const order = useLoaderData();

  const handleDownload = () => {
     SuccessToast("Adminpanel Download")
    const fileUrl = `${import.meta.env.VITE_BASE_URL}${
      order?.deliveryDetails?.adminPanelFile
    }`;
    window.open(fileUrl, "_blank");
  };
  const handleDownloadApp = () => {
    SuccessToast("App Download")
    const fileUrl = `${import.meta.env.VITE_BASE_URL}${
      order?.deliveryDetails?.appFile
    }`;
    window.open(fileUrl, "_blank");
  };


  const handleCopy = (link) => {
    if (!link) {
        ErrorToast("No link available to copy!")
      return;
    }
    navigator.clipboard.writeText(link)
      .then(() => {
        SuccessToast("Link copied to clipboard!");
      })
      .catch(() => {
        ErrorToast("Failed to copy the link.")
      });
  };
  return (
    <>
      <NavberWeb></NavberWeb>
      <div className="max-w-screen-md mx-auto px-2 pt-24">
        <div className="card border p-2 shadow-md">
          <p className="text-2xl font-bold  text-center underline">
            অর্ডার ডিটেইলস
          </p>
          <div className="mt-10">
            <div className="bg-green-50 p-4 rounded-2xl text-md">
              <p>সফটওয়্যার ধরন: {order?.deliveryType}</p>
              <p>সফটওয়্যার: {order?.product?.title}</p>
              <p>ডেলিভারি সময়: {order?.deliveryTime}</p>
              <p>নোট: {order?.deliveryDetails?.note}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 my-8">
              {order?.deliveryType === "Apps" ? (
                <>
                  <div
                    className="p-4 bg-purple-50 rounded-2xl text-purple-700 font-bold  text-xs md:text-lg flex justify-between items-center cursor-pointer"
                    onClick={handleDownloadApp}>
                    <p>এপপ্স</p>
                    <MdDownload></MdDownload>
                  </div>
                  <div
                    className="p-4 bg-blue-50 rounded-2xl text-blue-700 font-bold  text-xs md:text-lg flex justify-between items-center cursor-pointer"
                    onClick={handleDownload}>
                    <p>এডমিন প্যানেল</p>
                    <MdDownload></MdDownload>
                  </div>
                </>
              ) : (
                <>
                  <div
                    className="p-4 bg-purple-50 rounded-2xl text-purple-700 font-bold  text-xs md:text-lg flex justify-between items-center cursor-pointer"
                    onClick={() => handleCopy(order?.deliveryDetails?.link)}>
                    <p>ওয়েবসাইট লিংক</p>
                    <FaLink></FaLink>
                  </div>
                  <div
                    className="p-4 bg-blue-50 rounded-2xl text-blue-700 font-bold  text-xs md:text-lg flex justify-between items-center cursor-pointer"
                    onClick={() => handleCopy(order?.deliveryDetails?.adminPanelLink)}>
                    <p>এডমিন প্যানেল লিংক</p>
                    <FaLink></FaLink>
                  </div>
                  <div
                    className="p-4 bg-yellow-50 rounded-2xl text-yellow-700 font-bold  text-xs md:text-lg "
                   >
                    <div className="flex justify-between items-center">
                      <p>ইউসার নাম</p>
                      <FaUser />
                    </div>
                    <p>{order?.deliveryDetails?.username}</p>
                  </div>
                  <div
                    className="p-4 bg-gray-50 rounded-2xl text-gray-700 font-bold  text-xs md:text-lg"
                    >
                    <div className="flex justify-between items-center">
                      <p>পাসওয়ার্ড</p>
                      <MdPassword />
                    </div>
                    <p>{order?.deliveryDetails?.password}</p>
                  </div>
                </>
              )}
              <a
                className="p-4 bg-red-50 rounded-2xl text-red-700 font-bold  text-xs md:text-lg flex justify-between items-center cursor-pointer"
                href={order?.deliveryDetails?.videoLink}>
                <p>ভিডিও</p>
                <FaYoutube />
              </a>
            </div>
            <div className="border mb-2"></div>
            <p className="text-red-600 font-bold text-center">
              বিঃদ্রঃ এই এপপ্সটি ৩০ দিন এখানে থাকবে
            </p>
          </div>
        </div>
        <ToastContainer/>
      </div>
    </>
  );
};

export default OrderDetails;
