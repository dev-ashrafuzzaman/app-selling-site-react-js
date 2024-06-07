import React, { useState } from "react";
import NavberWeb from "../Navber/NavberWeb";
import Footer from "../Footer";
import { useForm } from "react-hook-form";
import { useLoaderData, useNavigate } from "react-router-dom";
import useWebUtils from "../../../hooks/web/useWebUtils";
import useAuth from "../../../hooks/useAuth";
import { MdCopyAll } from "react-icons/md";
import { ErrorToast, SuccessToast } from "../../../utils/Toastify";
import { ToastContainer } from "react-toastify";
import PaymentOption from "./PaymentOption";
import CheckoutBtn from "./CheckoutBtn";
import InputField from "./InputField";
import useUserSecure from "../../../hooks/web/useUserSecure";
import { getCurrentDateTime } from "../../../utils/HandleCurrentDate";
import ScreenLoad from "../../ScreenLoad";

const Checkout = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    clearErrors,
    setError,
  } = useForm();
  const product = useLoaderData();
  const { _id, title, categoryName, price, categoryId, pricePackage } = product;
  const webUtils = useWebUtils();
  const { WebUser } = useAuth();
  const [axiosSecure] = useUserSecure();

  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [selectedNext, setSelectedNext] = useState(false);
  const [selectedPayment, setSelectedPayment] = useState(null);
  const [selectedPackage, setSelectedPackage] = useState("");
  const navigate = useNavigate();
  console.log(selectedPackage);

  // Apps Order Submit
  const onSubmit = async (data) => {
    setLoading(true);
    // Check if image is provided
    if (!data.image || !data.image[0]) {
      setLoading(false);
      ErrorToast("Please select an image.");
      return;
    }

    // Check if the file is an image
    const allowedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/jpg",
    ];
    if (!allowedImageTypes.includes(data.image[0].type)) {
      setLoading(false);
      ErrorToast("Please select a valid image file (JPEG, PNG, GIF, or JPG).");
      return;
    }

    // Check image size
    const imageSize = data.image[0].size / 1024; // in KB
    if (imageSize > 1000) {
      setLoading(false);
      ErrorToast("Image size exceeds 1000KB limit.");
      return;
    }

    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("targetLink", "checkoutApp");

    try {
      const response = await axiosSecure.post("/public/upload", formData);

      const order = {
        uId: WebUser,
        product: {
          productId: _id,
          title,
          categoryId,
          price,
        },
        custom: {
          name: data.appName,
          mobile: data.mobile,
          email: data.email,
          pass: data.password,
          logo: response.data.imageUrl,
          package: "",
        },
        payment: {
          method: selectedPayment?.name,
          type: selectedPayment?.type,
          number: selectedPayment?.number,
          transactionId: data.traxID,
        },
        orderTime: getCurrentDateTime(),
        downloadStatus: false,
        link: "",
        status: "Pending",
      };
      await axiosSecure
        .post(`/api/v1/web/user/checkout`, order)
        .then((data) => {
          if (data.data.insertedId) {
            setLoading(false);
            SuccessToast("Submit Success");
            reset();
            setTimeout(() => {
              navigate("/user/orders");
            }, 2000);
          } else {
            setLoading(false);
            ErrorToast(data.data.Error);
          }
        });
    } catch (error) {
      setLoading(false);
    }
  };

  const onSubmit2 = async (data) => {
    if (!selectedPackage) {
      setError("package", {
        type: "manual",
        message: "একটি প্যাকেজ সিলেক্ট করুন।",
      });
      return;
    }

    setLoading(true);
    try {
      const order = {
        uId: WebUser,
        product: {
          productId: _id,
          title,
          categoryId,
          price: selectedPackage?.price,
        },
        custom: {
          name: data.webName,
          mobile: data.mobile,
          email: data.email,
          pass: data.password,
          logo: "",
          package: data.package,
        },
        payment: {
          method: selectedPayment?.name,
          type: selectedPayment?.type,
          number: selectedPayment?.number,
          transactionId: data.traxID,
        },
        orderTime: getCurrentDateTime(),
        downloadStatus: false,
        link: "",
        status: "Pending",
      };
      await axiosSecure
        .post(`/api/v1/web/user/checkout`, order)
        .then((data) => {
          if (data.data.insertedId) {
            setLoading(false);
            SuccessToast("Submit Success");
            reset();
            setTimeout(() => {
              navigate("/user/orders");
            }, 2000);
          } else {
            setLoading(false);
            ErrorToast(data.data.Error);
          }
        });
    } catch (error) {
      setLoading(false);
    }
  };

  const handleImage = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleCopyNumber = (data) => {
    SuccessToast("Copy Success");
    navigator.clipboard.writeText(data);
  };

  const handlePayment = (data) => {
    setSelectedPayment(data);
  };

  const handlePackageChange = (event) => {
    const selectedOption = pricePackage.find(
      (option) => option.name === event.target.value
    );
    setSelectedPackage(selectedOption);
    clearErrors("package");
  };

  return (
    <>
      {loading && <ScreenLoad></ScreenLoad>}
      <NavberWeb></NavberWeb>
      <div className="max-w-screen-2xl mx-auto pt-24">
        <h1 className="my-8 text-2xl text-center font-semibold border-y-2 w-48 py-2 border-dashed mx-auto">
          চেকআউট
        </h1>

        {/* Product Details Table */}
        {!selectedNext && (
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
                    <td>
                      {categoryId == "6650aabd63490d2bca547c21" ? (
                        price
                      ) : (
                        <>
                          {selectedPackage ? (
                            selectedPackage.price
                          ) : (
                            <p className="text-red-500">প্যাকেজ সিলেক্ট করুন</p>
                          )}
                        </>
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}
        {/* End Product Details Area */}

        {/* Checkout order Details */}
        {categoryId == "6650aabd63490d2bca547c21" ? (
          <>
            {/* Apps Function */}
            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="card-body">
                {!selectedNext && (
                  <>
                    {/* App Logo Select */}
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

                    <div className="form-control">
                      <label htmlFor="appName" className="label label-text">
                        এপপ্সের নাম
                      </label>
                      <input
                        type="text"
                        placeholder="এপপ্সের নাম"
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
                          একটি বৈধ এপপ্সের নাম লিখুন।
                        </span>
                      )}
                    </div>

                    <InputField
                      register={register}
                      errors={errors}
                      setSelectedNext={setSelectedNext}></InputField>
                  </>
                )}

                {/* Checkout Area */}
                {selectedNext && (
                  <>
                    <PaymentOption
                      selectedPayment={selectedPayment}
                      webUtils={webUtils}
                      handlePayment={handlePayment}
                      handleCopyNumber={handleCopyNumber}
                      setSelectedNext={setSelectedNext}></PaymentOption>
                  </>
                )}

                {/* Checkout btn */}
                <CheckoutBtn
                  selectedNext={selectedNext}
                  selectedPayment={selectedPayment}
                  errors={errors}
                  register={register}></CheckoutBtn>
              </form>
            </div>
          </>
        ) : (
          <>
            {/* Website Function */}
            <div>
              <form onSubmit={handleSubmit(onSubmit2)} className="card-body">
                {!selectedNext && (
                  <>
                    <div className="form-control">
                      <label htmlFor="webName" className="label label-text">
                        ওয়েবসাইটের নাম
                      </label>
                      <input
                        type="text"
                        placeholder="ওয়েবসাইটের নাম"
                        id="webName"
                        name="webName"
                        className="input input-bordered"
                        autoComplete="webName"
                        {...register("webName", {
                          required: true,
                        })}
                      />
                      {errors.appName && (
                        <span className="text-red-500 text-base mt-1">
                          একটি বৈধ ওয়েবসাইটের নাম লিখুন।
                        </span>
                      )}
                    </div>

                    <div className="form-control">
                      <label htmlFor="package" className="label label-text">
                        প্যাকেজ সিলেক্ট করুন
                      </label>
                      <select
                        className="select select-bordered w-full"
                        {...register("package", {
                          required: "একটি প্যাকেজ সিলেক্ট করুন।",
                        })}
                        onChange={handlePackageChange}
                        defaultValue="">
                        <option value="" disabled>
                          একটি প্যাকেজ সিলেক্ট করুন
                        </option>
                        {pricePackage?.map((option, index) => (
                          <option key={index} value={option.name}>
                            {option.name} -- {option.price} BDT
                          </option>
                        ))}
                      </select>
                      {errors.package && (
                        <span className="text-red-500 text-base mt-1">
                          {errors.package.message}
                        </span>
                      )}
                    </div>

                    <InputField
                      register={register}
                      errors={errors}
                      setSelectedNext={setSelectedNext}></InputField>
                  </>
                )}

                {selectedNext && (
                  <>
                    <PaymentOption
                      selectedPayment={selectedPayment}
                      webUtils={webUtils}
                      handlePayment={handlePayment}
                      handleCopyNumber={handleCopyNumber}
                      setSelectedNext={setSelectedNext}></PaymentOption>
                  </>
                )}

                {/* Checkout btn */}
                <CheckoutBtn
                  selectedNext={selectedNext}
                  selectedPayment={selectedPayment}
                  errors={errors}
                  register={register}></CheckoutBtn>
              </form>
            </div>
          </>
        )}
        {/* End Checkout order Details area  */}
      </div>
      <ToastContainer></ToastContainer>
      <Footer></Footer>
    </>
  );
};

export default Checkout;
