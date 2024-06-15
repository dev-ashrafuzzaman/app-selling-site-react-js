import React, { useState } from "react";
import Table from "../../ui/Table";
import ProductViewModal from "../../Product/ProductViewModal";
import useSingleProduct from "../../../hooks/useSingleProduct";
import useResellerSells from "../../../hooks/web/useResellerSells";
import TruckTable from "../../ui/TruckTable";
import SectionTitle from "../../SectionTitle";

const ResellerSells = () => {
  const [isProductViewOpen, setIsProductViewOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState({});
  const { isSingleProduct } = useSingleProduct();

  const [isResellerSell] = useResellerSells();

  const handleProductView = (order) => {
    setSelectedOrder(order);
    setIsProductViewOpen(!isProductViewOpen);
  };
  return (
    <div className="mt-10">
      <ProductViewModal
        isOpen={isProductViewOpen}
        setIsOpen={setIsProductViewOpen}
        data={selectedOrder}
        product={isSingleProduct}
      />
      <SectionTitle heading={"Sell Products"}></SectionTitle>
      <TruckTable head={["#", "Customer", "Product", "Status"]}>
        {isResellerSell?.map((item, index) => (
          <tr
            key={index}
            className="border-2 hover:bg-slate-100 text-lg text-center">
            <th className="border-2 p-2">{index + 1}</th>
            <td className="border-2 p-2">
              <a className="text-sky-600 font-bold cursor-pointer p-2">
                {item?.uId}
              </a>
            </td>
            <td className="border-2 p-2">
              <div>
                <button
                  onClick={() => handleProductView(item)}
                  className="text-sky-600 font-bold cursor-pointer p-2">
                  View Details
                </button>
                <p className="font-bold">{item.product.title}</p>
                <p>Price: {item.product.price}</p>
              </div>
            </td>

            <td className="border-2 p-2">
              <p
                className={`border rounded-full ${
                  item.status === "Pending"
                    ? "bg-purple-50 font text-purple-600"
                    : item.status === "Processing"
                    ? "bg-blue-50 font text-blue-600"
                    : item.status === "Complete"
                    ? "bg-green-50 font text-green-600"
                    : "bg-red-50 font text-red-600"
                }`}>
                {item.status}
              </p>
            </td>
          </tr>
        ))}
      </TruckTable>
    </div>
  );
};

export default ResellerSells;
