import React, { useState } from "react";
import NavberWeb from "../Navber/NavberWeb";
import Footer from "../Footer";
import { Link, useLoaderData } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const ViewProduct = () => {
  const product = useLoaderData();
  const { WebUser } = useAuth();
  const [selectImage, setSelectImage] = useState(0);
  return (
    <div>
      <NavberWeb></NavberWeb>
      <div className="max-w-screen-2xl mx-auto px-2 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <figure className="bg-slate-100 p-4 rounded-xl">
            <img
              src={`${import.meta.env.VITE_BASE_URL}${ 
                product?.imageUrls[selectImage]
              }`}
              alt={product?.title}
              className="mx-auto  object-cover rounded-md"
            />

            {/* <div className="grid  grid-cols-5 gap-4 my-4">
              {product?.imageUrls.map((img, index) => (
                <img
                  onClick={() => setSelectImage(index)}
                  className={`w-16 bg-white p-2 shadow-md h-[100px] ${selectImage == index ? ' border-[4px] border-green-500': ''}`}
                  src={`${import.meta.env.VITE_BASE_URL}${img}`}
                  key={index}></img>
              ))}
            </div> */}
          </figure>

          <div className="col-span-2  md:ml-4">
            <div>
              <h2 className="card-title text-3xl">{product?.title}</h2>
              <p className="text-xl font-semibold">
                ধরণ: {product?.categoryName}
              </p>
              {/* <h3 className="card-title text-xl">brand: {brand}</h3> */}
              <div className="text-xl  font-semibold text-green-700 mb-4">
                {product?.categoryId == "6650aabd63490d2bca547c21" ? (
                  <>
                    {product?.isDiscount ? (
                      <>
                        <del className="text-red-500">
                          মূল্য: {product?.price}
                        </del>{" "}
                        <p>
                          ডিসকাউন্ট মূল্য :{" "}
                          {parseInt(
                            product?.price -
                              (product?.price * product?.discount) / 100
                          )}
                        </p>
                      </>
                    ) : (
                      <>মূল্য: {product?.price}</>
                    )}
                  </>
                ) : (
                  // website product
                  <>
                    {product?.isDiscount ? (
                      <>
                        <ul>
                          {product?.pricePackage?.map((item, index) => (
                            <li key={index}>
                              <del className="text-red-500">
                                {index + 1}. মূল্য: {item.name} -- {item.price}{" "}
                                টাকা
                              </del>
                            </li>
                          ))}
                        </ul>

                        <div className="my-4">
                          <ul>
                            {product?.pricePackage?.map((item, index) => (
                              <li key={index}>
                                {index + 1}. ডিসকাউন্ট মূল্য: {item.name} --{" "}
                                {parseInt(
                                  item?.price -
                                    (item?.price * product?.discount) / 100
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <>
                        <ul>
                          {product?.pricePackage?.map((item, index) => (
                            <li key={index}>
                              {item.name} -- {item.price} টাকা
                            </li>
                          ))}
                        </ul>
                      </>
                    )}
                  </>
                )}{" "}
              </div>
            </div>
            <div className="my-4">
              <h3 className="text-3xl font-semibold">বৈশিষ্ট্য</h3>
              <ul>
                {product?.features?.map((feature, i) => (
                  <ul key={i}>
                    {i + 1}. {feature?.text}
                  </ul>
                ))}
              </ul>
            </div>
            {product?.demo && (
              <div className="my-4  font-semibold">
                <p>
                  #ডেমো লিংক:{" "}
                  <a
                    className="text-blue-500"
                    href={product?.demoLink}
                    target="_blank">
                    {" "}
                    ক্লিক করুন{" "}
                  </a>
                </p>
                <p>#ইউজার: {product?.userName}</p>
                <p>#পাসওয়ার্ড: {product?.password}</p>
              </div>
            )}

            {WebUser ? (
              <>
                <Link
                  to={`/product/checkout/${product?._id}`}
                  className="btn bg-green-700 text-white mt-4 md:w-60 w-full">
                  এখনি কিনুন
                </Link>
              </>
            ) : (
              <>
                <Link
                  to={`/user/auth/login`}
                  className="btn bg-green-700 text-white mt-4 md:w-60 w-full">
                  লগইন করুন
                </Link>
              </>
            )}
          </div>
        </div>

        <div className="border w-full my-10  rounded-3xl">
          <div className="w-full border-b p-6 flex justify-start items-center text-xl font-bold gap-4">
            <p className="border border-green-700 py-3 px-6 rounded-full ">
              বিস্তারিত তথ্য
            </p>
            <a href={product?.video} target="_blank">
              <p className="border hover:border-red-500 py-3 px-6 rounded-full">
                ভিডিও
              </p>
            </a>
          </div>
          <div className="p-6">
            <p className="text-justify">{product?.details}</p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ViewProduct;
