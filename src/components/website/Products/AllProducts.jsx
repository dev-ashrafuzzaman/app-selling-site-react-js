import React from "react";
import SingleProduct from "./SingleProduct";

const AllProducts = ({products}) => {
  

  return (
    <>
    <div className="border-b-2 mb-6 mt-10 text-xl font-bold">সকল সফটওয়্যার</div>
      <div className="grid md:grid-cols-5 gap-4">
        {products?.map((item, index) => (
          <SingleProduct key={index} product={item}></SingleProduct>
        ))}
      </div>
    </>
  );
};

export default AllProducts;
