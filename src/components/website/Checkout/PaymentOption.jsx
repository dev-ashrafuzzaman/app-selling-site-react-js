import React from "react";
import { MdArrowBack, MdCopyAll } from "react-icons/md";

const PaymentOption = ({
  selectedPayment,
  webUtils,
  handlePayment,
  handleCopyNumber,
  setSelectedNext,
}) => {
  return (
    <div>
      <p className="text-2xl font-semibold flex  items-center gap-4">
        <MdArrowBack
          onClick={() => setSelectedNext(false)}
          className="bg-slate-300 p-1 rounded-full text-3xl hover:bg-red-500 hover:text-white"></MdArrowBack>{" "}
        পেমেন্ট করুন: {selectedPayment?.name}
      </p>
      <div className="grid md:grid-cols-4   gap-4 my-8">
        {webUtils?.data?.result?.paymentMathod?.map((item, index) => (
          <div
            onClick={() => handlePayment(item)}
            key={index}
            className={`border flex flex-col justify-center items-center  border-dashed p-4 rounded-2xl  hover:shadow-slate-300 hover:shadow-md cursor-pointer ${
              selectedPayment?.name === item?.name ? "border-green-600" : ""
            }`}>
            <img
              src={`${import.meta.env.VITE_BASE_URL}${item.logo}`}
              alt="payment"
              className="h-[100px]"
            />
            <div className="divider"></div>
            <p className="font-bold text-4xl">{item.name}</p>
            <p className="font-bold text-2xl flex justify-center items-center gap-2">
              {item.number}{" "}
              <MdCopyAll
                onClick={() => handleCopyNumber(item?.number)}></MdCopyAll>
            </p>
            <p className="text-2xl">{item.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PaymentOption;
