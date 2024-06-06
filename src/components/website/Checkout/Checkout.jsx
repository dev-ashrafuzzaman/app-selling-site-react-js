import React, { useState } from "react";
import NavberWeb from "../Navber/NavberWeb";
import Footer from "../Footer";
import { useForm } from "react-hook-form";

const Checkout = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const order = {
      user: "",
      appName: data.appName,
      email: data.email,
      mobile: data.mobile,
      password: data.password,
      paymentMethod: "",
      paymentType: "",
      transactionId: data.transactionId,
      status: "Processing",
      downloadStatus: false,
      link: "",
    };
  };

  const product = {
    _id: "1",
    title: "প্লেন গেম এপপ্স",
    categoryId: "6650aabd63490d2bca547c21",
    categoryName: "এপপ্স",
    imageUrls: [
      "https://hotpot.ai/designs/thumbnails/samsung-s10-screenshot/43.jpg",
      "https://i.ibb.co/MZrj9bB/039cc9159167787-Y3-Jvc-Cwx-MDU1-LDgy-NSww-LDEz.jpg",
    ],
    price: 10,
    details: `Step up your style game with the iconic Levi's 501 Jeans. With their classic straight leg fit, 100% cotton denim, and button fly closure, these jeans offer timeless appeal and unmatched comfort.`,
    features: ["ok", "ok", "ok", "ok", "ok"],
    estimateDelivary: "2",
    demoLink: "https://wedonext.com",
    password: "123456",
    userName: "admin@gmail.com",
    demo: true,
    video: "https://www.youtube.com/",
  };

  const { _id, title, categoryName, price } = product;

  const handleImage = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  return (
    <>
      <NavberWeb></NavberWeb>
      <div className="max-w-screen-2xl mx-auto">
        <h1 className="my-8 text-2xl text-center font-semibold border-y-2 w-48 py-2 border-dashed mx-auto">
          চেকআউট
        </h1>

        {/* Product Details Table */}
        <div className="px-2">
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>নং</th>
                  <th>নাম</th>
                  <th>ধরণ</th>
                  <th>মূল্য</th>
                </tr>
              </thead>
              <tbody className="text-black font-semibold">
                {/* row 1 */}
                <tr>
                  <th>1</th>
                  <td>{title}</td>
                  <td>{categoryName}</td>
                  <td>{price}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        {/* End Product Details Area */}

        {/* Checkout order Details */}
        <div>
          <form onSubmit={handleSubmit(onSubmit)} className="card-body">
            <div className="form-control">
              <label htmlFor="appName" className="label label-text">
                এপপ্স নাম
              </label>
              <input
                type="text"
                placeholder="এপপ্স নাম"
                id="appName"
                name="appName"
                className="input input-bordered"
                autoComplete="appName"
                {...register("appName", {
                  required: true,
                })}
              />
              {errors.appName && (
                <span className="text-red-500 text-base mt-1">
                  একটি বৈধ এপপ্স নাম লিখুন।
                </span>
              )}
            </div>
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

            {/* Payment Method Select */}
            <div className="form-control mt-2">
              <h1 className="mb-1">
                এপপ্স লোগো আপলোড করুন{" "}
                <span className="text-red-600">Max size 500kb</span>
              </h1>
              <div>
              <div className="flex justify-between">
                    <input
                      onInput={handleImage}
                      type="file"
                      {...register("image", { required: true })}
                      name="image" // Add the name attribute
                      className="file-input file-input-bordered w-full max-w-xs"
                    />
                  </div>
                {selectedImage && (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="Selected Image"
                    className="mt-2 w-32"
                  />
                )}
              </div>
              {errors.paymentMethod && (
                <span className="text-red-500 text-base mt-1">
                  এপপ্স লোগো আপলোড করুন
                </span>
              )}
            </div>

            <div className="form-control mt-6">
              <button className="btn bg-green-700 text-white" type="submit">
                চেকআউট করুন
              </button>
            </div>
          </form>
        </div>
        {/* End Checkout order Details area  */}
      </div>
      <Footer></Footer>
    </>
  );
};

export default Checkout;
