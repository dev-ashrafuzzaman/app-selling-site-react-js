import React from "react";

const CheckoutBtn = ({ selectedNext, selectedPayment, price, register, errors }) => {
  console.log(price);
  return (
    <>
      {selectedPayment && <>
        <div className="form-control">
          <div className="text-center font-bold border rounded-lg p-2 text-lg">মূল্য: {price}</div>
          <label htmlFor="payNumber" className="label label-text text-red-600">
          পেমেন্ট নাম্বার <span className="bg-red-500 tooltip px-4 py-2 text-white font-bold rounded-full" data-tip="যে নাম্বার থেকে টাকা পাঠাইছেন সেই নম্বরটি এখানে লিখুন!">i</span>
          </label>
          <input
            type="number"
            placeholder="পেমেন্ট নাম্বার"
            id="payNumber"
            name="payNumber"
            className="input input-bordered"
            autoComplete="payNumber"
            {...register("payNumber", {
              required: true,
            })}
          />
          {errors.appName && (
            <span className="text-red-500 text-base mt-1">
              একটি বৈধ পেমেন্ট নাম্বার লিখুন।
            </span>
          )}
        </div>
        <div className="form-control">
          <label htmlFor="traxID" className="label label-text text-red-600">
            ট্রান্সজেকশন আইডি
          </label>
          <input
            type="text"
            placeholder="ট্রান্সজেকশন আইডি"
            id="traxID"
            name="traxID"
            className="input input-bordered"
            autoComplete="traxID"
            {...register("traxID", {
              required: true,
            })}
          />
          {errors.appName && (
            <span className="text-red-500 text-base mt-1">
              একটি বৈধ ট্রান্সজেকশন আইডি লিখুন।
            </span>
          )}
        </div>
      </>}
      <div className="form-control mt-6">
        {selectedNext && (
          <button
            disabled={selectedPayment ? false : true}
            className={`btn bg-green-700 text-white hover:bg-green-600 ${
              selectedPayment ? "cursor-pointer" : "cursor-not-allowed"
            }`}
            type="submit">
            চেকআউট করুন
          </button>
        )}
      </div>
    </>
  );
};

export default CheckoutBtn;
