import React from "react";
import { Link } from "react-router-dom";
import './Product.css'
const SingleProduct = ({product}) => {
    const {title , imageUrls,categoryName,_id, demoLink, video,details, demo} = product
  return (
    <Link to={`/product/details/${_id}`} className="card bg-base-100 shadow-xl hoverCard">
      <figure>
        <img
        className="w-full max-h-[450px]"
          src={imageUrls[0]}
          alt="Shoes"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">
         {title}
          <div className="badge badge-success text-white">{categoryName}</div>
        </h2>
        <p className="line-clamp-3 text-justify">{details}</p>
        <div className="card-actions justify-end mt-4">
            {
                demo && <a href={demoLink} target="_blank" className="badge badge-outline">ডেমো</a>
            }
          <a href={video} target="_blank" className="badge badge-outline">ভিডিও</a>
        </div>
      </div>
    </Link>
  );
};

export default SingleProduct;
