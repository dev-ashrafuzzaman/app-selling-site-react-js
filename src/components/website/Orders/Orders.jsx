import { useState } from "react";
import NavberWeb from "../Navber/NavberWeb";
import useUserOrders from "../../../hooks/web/useUserOrders";
import { MdDownload } from "react-icons/md";
import ResellerApplyModal from "./ResellerApplyModal";
import { ToastContainer } from "react-toastify";
import useWebUser from "../../../hooks/web/useWebUser";

const Orders = () => {
  const [isUserOrders] = useUserOrders();
  const [isOpen, setIsOpen] = useState(false);
  const [isWebUser] = useWebUser();
  return (
    <>
      <ResellerApplyModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}></ResellerApplyModal>
      <NavberWeb></NavberWeb>
      <div className="max-w-screen-2xl mx-auto px-2 pt-24">
        <div className="bg-slate-100 md:p-10 p-4 rounded-3xl ">
          <div className="text-2xl my-6 px-2 font-semibold border-b-4 pb-2 flex justify-between items-center">
            <p className="">অর্ডার সমূহ:</p>
            {isWebUser?.user?.type == "Normal" && (
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="btn btn-sm bg-green-600 text-white">
                রিসেলার আবেদন করুন
              </button>
            )}
            {
              isWebUser?.user?.type == "Reseller"  && <p className="text-red-500">দয়া  করে অপেক্ষা করুন আপনার রিসেলার এপ্লিকেশন স্টেটাস : {isWebUser?.user?.resellerStatus} </p>
            }
          </div>
          <div className="grid grid-cols-1 gap-4">
            {isUserOrders?.map((order, index) => (
              <div
                key={index}
                className="bg-white border-2 border-dashed  rounded-2xl">
                <div className="md:p-10 p-4">
                  <div className="w-full">
                    <div className="flex justify-between">
                      <p className="font-bold">অর্ডার আইডি</p>
                      <p>{order._id}</p>
                    </div>
                    <div className="flex justify-between mb-2">
                      <p className="font-bold">অর্ডার তারিখ</p>
                      <p>{order.orderTime}</p>
                    </div>
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between">
                      <p className="font-bold">পেমেন্ট</p>
                      <p>{order.payment.method}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-bold">ট্রানজেকশন আইডি</p>
                      <p>{order.payment.transactionId}</p>
                    </div>
                    <div className="divider"></div>
                  </div>
                  <div className="w-full">
                    <div className="flex justify-between">
                      <p className="font-bold">সফটওয়্যার</p>
                      <p>{order.product.title}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-bold">মূল্য</p>
                      <p>{order.product.price}</p>
                    </div>
                    <div className="flex justify-between">
                      <p className="font-bold">স্ট্যাটাস</p>
                      <p
                        className={` text-white font-semibold  px-4 rounded-full ${
                          order.status == "Pending"
                            ? "bg-orange-600"
                            : order.status == "Processing"
                            ? "bg-info"
                            : order.status == "Complete"
                            ? "bg-green-600"
                            : "bg-red-600"
                        }`}>
                        {order.status}
                      </p>
                    </div>
                    {/* <div className="divider divider-success"></div> */}
                  </div>
                </div>
                <div className="text-center bg-blue-500 rounded-b-2xl border-b-2 p-2 text-white">
                  {!order?.downloadStatus ? (
                    <>
                      <p className="font-bold">{order?.time ? order?.time : 'অপেক্ষা করুন'}</p>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-center items-center font-semibold">
                        ডাউনলোড করুন{" "}
                        <a
                          href={order.link}
                          target="_blank"
                          className="bg-white p-2 ml-2 rounded-full text-black flex justify-center items-center btn animate-bounce transition duration-700 ease-in-out btn-success  shadow-lg shadow-red-300 btn-sm drop-shadow-lg">
                          <MdDownload></MdDownload>
                        </a>
                      </div>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default Orders;
