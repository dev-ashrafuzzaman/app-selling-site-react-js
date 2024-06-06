import React from "react";
import NavberWeb from "../Navber/NavberWeb";
import Footer from "../Footer";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";

const ViewProduct = () => {
    const { WebUser, WebUserloading } = useAuth();
    console.log(WebUser);
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

  const {
    _id,
    imageUrls,
    title,
    categoryName,
    price,
    features,
    demo,
    demoLink,
    userName,
    password,
    video,
    details,
  } = product;
  return (
    <div>
      <NavberWeb></NavberWeb>
      <div className="max-w-screen-2xl mx-auto px-2">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <figure className="bg-slate-100 p-4 rounded-xl">
            <img
              src={imageUrls[0]}
              alt={title}
              className="mx-auto  object-cover rounded-md"
            />
          </figure>
          <div className="col-span-2  md:ml-4">
            <div>
              <h2 className="card-title text-3xl">{title}</h2>
              <p className="text-xl font-semibold">ধরণ: {categoryName}</p>
              {/* <h3 className="card-title text-xl">brand: {brand}</h3> */}
              <h3 className="text-xl font-semibold text-green-700 mb-4">
                মূল্য: {price} টাকা
              </h3>
            </div>
            <div className="my-4">
              <h3 className="text-3xl font-semibold">বৈশিষ্ট্য</h3>
              <ul>
                {features.map((feature, i) => (
                  <ul key={i}>
                    {i + 1}. {feature}
                  </ul>
                ))}
              </ul>
            </div>
            {demo && (
              <div className="my-4  font-semibold">
                <p>
                  #ডেমো লিংক:{" "}
                  <a className="text-blue-500" href={demoLink} target="_blank">
                    {" "}
                    ক্লিক করুন{" "}
                  </a>
                </p>
                <p>#ইউজার: {userName}</p>
                <p>#পাসওয়ার্ড: {password}</p>
              </div>
            )}

{
    WebUser ? <>
    <Link to={`/product/checkout/${_id}`} className="btn bg-green-700 text-white mt-4 md:w-60 w-full">এখনি কিনুন</Link>
    </> : <>
    <Link to={`/user/auth/login`} className="btn bg-green-700 text-white mt-4 md:w-60 w-full">লগইন করুন</Link>
    </>
}
            
          </div>
        </div>

        <div className="border w-full my-10  rounded-3xl">
          <div className="w-full border-b p-6 flex justify-start items-center text-xl font-bold gap-4">
            <p className="border border-green-700 py-3 px-6 rounded-full ">
              বিস্তারিত তথ্য
            </p>
            <a href={video} target="_blank">
              <p className="border hover:border-red-500 py-3 px-6 rounded-full">
                ভিডিও
              </p>
            </a>
          </div>
          <div className="p-6">
            <p className="text-justify">{details}</p>
          </div>
        </div>
      </div>
      <Footer></Footer>
    </div>
  );
};

export default ViewProduct;
