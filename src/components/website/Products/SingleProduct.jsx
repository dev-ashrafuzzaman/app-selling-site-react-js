import React from "react";
import {useNavigate } from "react-router-dom";
import "./Product.css";

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
  } = product;

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate(`/product/details/${_id}`);
  };

  return (
    <div onClick={handleCardClick} className="card bg-base-100 shadow-xl hoverCard cursor-pointer">
      <figure>
        <img
          className="w-full max-h-[450px]"
          src={`${import.meta.env.VITE_BASE_URL}${imageUrls[0]}`}
          alt="Product"
        />
      </figure>
      <div className="card-body">
        <h2 className="line-clamp-1 font-bold">
          {title}
          <div className="badge badge-success text-white ms-2">
            {categoryName}
          </div>
        </h2>
        <p className="line-clamp-3 text-justify">{details}</p>
        <div className="card-actions justify-end mt-4">
          {demo && (
            <a
              href={demoLink}
              target="_blank"
              rel="noopener noreferrer"
              className="badge badge-outline">
              ডেমো
            </a>
          )}
          <a
            href={video}
            target="_blank"
            rel="noopener noreferrer"
            className="badge badge-outline">
            ভিডিও
          </a>
        </div>
      </div>
    </div>
  );
};

export default SingleProduct;
