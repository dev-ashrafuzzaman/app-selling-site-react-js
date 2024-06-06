import React from "react";
import SingleProduct from "./SingleProduct";

const AllProducts = () => {
  const product = [
    {
      _id: '1' ,
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
    },
    {
      _id: '2' ,
      title: "গেম ওয়েবসাইট",
      categoryId: "6650aabd63490d2bca547c22",
      categoryName: "ওয়েবসাইট",
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
      demo: false,
      video: "https://www.youtube.com/",
    },
  ];

  return (
    <>
    <div className="border-b-2 mb-6 mt-10 text-xl font-bold">সকল সফটওয়্যার</div>
      <div className="grid md:grid-cols-5 gap-4">
        {product?.map((item, index) => (
          <SingleProduct key={index} product={item}></SingleProduct>
        ))}
      </div>
    </>
  );
};

export default AllProducts;
