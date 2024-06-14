import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Product.css";
import {
  MdCategory,
  MdDiscount,
  MdPunchClock,
  MdVideoFile,
} from "react-icons/md";
import { FaCoins } from "react-icons/fa";

const SingleProduct = ({ product }) => {
  const {
    title,
    imageUrls,
    categoryName,
    _id,
    demoLink,
    video,
    details,
    demo,
    discount,
    isDiscount,
    price,
    pricePackage,
  } = product;

  return (
    // <div onClick={handleCardClick} className="card bg-base-100 shadow-xl hoverCard cursor-pointer">
    //   <figure>
    //     <img
    //       className="w-full max-h-[450px]"
    //       src={`${import.meta.env.VITE_BASE_URL}${imageUrls[0]}`}
    //       alt="Product"
    //     />
    //   </figure>
    //   <div className="card-body">
    //     <h2 className="line-clamp-1 font-bold">
    //       {title}
    //       <div className="badge badge-success text-white ms-2">
    //         {categoryName}
    //       </div>
    //     </h2>
    //     <p className="line-clamp-3 text-justify">{details}</p>
    //     <div className="card-actions justify-end mt-4">
    //       {demo && (
    //         <a
    //           href={demoLink}
    //           target="_blank"
    //           rel="noopener noreferrer"
    //           className="badge badge-outline">
    //           ডেমো
    //         </a>
    //       )}
    //       <a
    //         href={video}
    //         target="_blank"
    //         rel="noopener noreferrer"
    //         className="badge badge-outline">
    //         ভিডিও
    //       </a>
    //     </div>
    //   </div>
    // </div>
    <div
      className={`card bg-base-100 shadow-xl border-2 border-dashed cursor-pointer`}>
      <Link to={`/product/details/${_id}`}>
        <div
          className="bg-red-500  flex  md:h-[550px] h-[450px] rounded-2xl bg-cover"
          style={{
            backgroundImage: `url(${`${import.meta.env.VITE_BASE_URL}${
              imageUrls[0]
            }`})`,
          }}>
          {isDiscount && (
            <div className="h-full">
              <div className="gap-4 flex flex-col justify-between h-full">
                <div
                  className={`bg-black text-white rounded-tl-xl rounded-br-xl px-2 py-1 text-xs`}>
                  <p className="flex items-center gap-1">
                    <MdDiscount></MdDiscount>
                    <span> {discount} % OFF</span>
                  </p>
                </div>
                {/* <div className='p-2 hover:cursor-pointer'>
                       <p className="font-bold text-white">Visit</p>
                   </div> */}
              </div>
            </div>
          )}
        </div>
      </Link>
      <div className="space-y-2 flex justify-between items-center gap-4 p-4">
        <h2 className="text-sm w-full font-semibold line-clamp-1">{title}</h2>
        <h2 className="text-sm flex items-center gap-1 badge-success py-1 px-2 text-white rounded-full">
          <MdCategory></MdCategory>
          {categoryName}
        </h2>
      </div>
    </div>
  );
};

export default SingleProduct;
