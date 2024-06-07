import React from "react";

const CheckoutBtn = ({ selectedNext, selectedPayment, register, errors }) => {
  return (
    <>
      {selectedPayment && (
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
      )}
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
