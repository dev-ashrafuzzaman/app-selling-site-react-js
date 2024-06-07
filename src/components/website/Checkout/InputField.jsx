import React from "react";

const InputField = ({ register, errors, setSelectedNext }) => {
  return (
    <div>
      <div className="form-control">
        <label htmlFor="mobile" className="label label-text">
          হোয়াটস্যাপ মোবাইল নম্বর
        </label>
        <input
          type="number"
          placeholder="হোয়াটস্যাপ মোবাইল নম্বর"
          id="mobile"
          name="mobile"
          className="input input-bordered"
          autoComplete="mobile"
          {...register("mobile", {
            required: true,
          })}
        />
        {errors.mobile && (
          <span className="text-red-500 text-base mt-1">
            একটি বৈধ হোয়াটস্যাপ মোবাইল নম্বর লিখুন।
          </span>
        )}
      </div>
      <div className="form-control">
        <label htmlFor="email" className="label label-text">
          ইমেইল
        </label>
        <input
          type="email"
          placeholder="ইমেইল লিখুন"
          id="email"
          name="email"
          className="input input-bordered"
          autoComplete="email"
          {...register("email", {
            required: true,
            pattern: /^[\w-.]+@([\w-]+\.)+[\w-]{2,}$/,
          })}
        />
        {errors.email && (
          <span className="text-red-500 text-base mt-1">
            একটি বৈধ ইমেইল ঠিকানা লিখুন।
          </span>
        )}
      </div>
      <div className="form-control">
        <label htmlFor="password" className="label label-text">
          ইমেইলের পাসওয়ার্ড
        </label>
        <input
          type="password"
          placeholder="ইমেইলের পাসওয়ার্ড"
          id="password"
          name="password"
          className="input input-bordered"
          autoComplete="new-password"
          {...register("password", { required: true })}
        />
        {errors.password && (
          <span className="text-red-500 text-base mt-1">
            একটি ইমেইলের পাসওয়ার্ড লিখুন.
          </span>
        )}
      </div>

      <div>
        <button
          onClick={() => setSelectedNext(true)}
          className="btn bg-green-700 text-white w-full my-6">
          পরবর্তী
        </button>
      </div>
    </div>
  );
};

export default InputField;
