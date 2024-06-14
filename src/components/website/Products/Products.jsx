import React, { useState } from "react";
import SingleProduct from "./SingleProduct";
import useProducts from "../../../hooks/web/useProducts";
import { useLocation } from "react-router-dom";
import NavberWeb from "../Navber/NavberWeb";

const useQuery = () => {
  return new URLSearchParams(useLocation().search);
};

const Products = () => {
  const query = useQuery();
  const categoryId = query.get("categoryId");
  const { products} = useProducts(categoryId);


  return (
    <>
      <NavberWeb></NavberWeb>
      <div className="max-w-screen-2xl mx-auto pt-24">
        <div className="border-b-2 mb-6 mt-10 text-xl font-bold">
          সকল সফটওয়্যার
        </div>
        <div className="grid md:grid-cols-5 gap-4">
          {products?.map((item, index) => (
            <SingleProduct key={index} product={item}></SingleProduct>
          ))}
        </div>
      </div>
    </>
  );
};

export default Products;
