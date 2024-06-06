import React from "react";
import { Link } from "react-router-dom";

const Category = ({categorys}) => {
  return (
    
      <div className="grid grid-cols-2 gap-5 mb-5 my-5">
        {categorys?.map((cat, index) => (
      <Link to={`/products?categoryId=${cat?._id}`}   key={index}>
          <div
            className={`shadow-xl text-white border p-4 text-center rounded-xl hover:bg-green-50 hover:text-green-700 font-semibold md:text-3xl text-xl ${
              cat?._id == "6650aabd63490d2bca547c21"
                ? "bg-red-500"
                : "bg-blue-500"
            }`}
          >
            {cat?.name}
          </div>
      </Link>
        ))}
      </div>
   
  );
};

export default Category;
