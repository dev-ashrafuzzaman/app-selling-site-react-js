import useOrders from "../../../hooks/useOrders";
import Table from "../../../components/ui/Table";
import { FaEdit, FaTrash } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle";
import { HandleDeleteOrder } from "../../../utils/HandleDelete";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import ScreenLoad from "../../../components/ScreenLoad";
import { useState } from "react";
import OrderStatusModal from "../../../components/Order/OrderStatusModal";
import { MdDeliveryDining } from "react-icons/md";
import OrderDelivaryModal from "../../../components/Order/OrderDelivaryModal";
import ProductViewModal from "../../../components/Product/ProductViewModal";
import useSingleProduct from "../../../hooks/useSingleProduct";
import { ToastContainer } from "react-toastify";

const ManageOrder = () => {
  const [axiosSecure] = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [isDelivaryOpen, setIsDelivaryOpen] = useState(false);
  const [isProductViewOpen, setIsProductViewOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const {isSingleProduct} = useSingleProduct();

  const {
    isOrders,
    refetch,
    isOrdersLoading,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    searchQuery,
    setSearchQuery,
    totalPages,
    totalCount,
  } = useOrders();


  const [selectedOrder, setSelectedOrder] = useState({});

  const handleStatusChange = (order) => {
    setSelectedOrder(order);
    setIsOpen(!isOpen);
  };
  const handleOrderDelivary = (order) => {
    setSelectedOrder(order);
    setIsDelivaryOpen(!isDelivaryOpen);
  };
  const handleProductView = (order) => {
    setSelectedOrder(order);
    setIsProductViewOpen(!isProductViewOpen);
  };

  return (
    <div>
       {isOrdersLoading || isLoading && <ScreenLoad />}
      <OrderStatusModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={selectedOrder}
        axiosSecure={axiosSecure}
        refetch={refetch}
      />
      <OrderDelivaryModal
        isOpen={isDelivaryOpen}
        setIsOpen={setIsDelivaryOpen}
        data={selectedOrder}
        axiosSecure={axiosSecure}
        refetch={refetch}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />
      <ProductViewModal
        isOpen={isProductViewOpen}
        setIsOpen={setIsProductViewOpen}
        data={selectedOrder}
        product={isSingleProduct}
      />
     
      <SectionTitle heading={"Orders Management"} />
      <Table
        head={[
          "#",
          "Customer",
          "Product",
          "Orders",
          "Payment",
          "Status",
          "Action",
        ]}
        refetch={refetch}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalPages={totalPages}
        totalCount={totalCount}>
        {isOrders?.data?.map((item, index) => (
          <tr
            key={index}
            className="border-2 hover:bg-slate-100 text-lg text-center">
            <th className="border-2 p-2">{index + 1}</th>
            <td className="border-2 p-2">
              <a
                href={`/leery/admin/dashboard/track-user/${item.uId}`}
                className="text-sky-600 font-bold cursor-pointer p-2"
                target="_blank">
                {item?.uId}
              </a>
            </td>
            <td className="border-2 p-2">
              <div>
                <button
                onClick={()=> handleProductView(item)}
                  className="text-sky-600 font-bold cursor-pointer p-2">
                  View Details
                </button>
                <p className="font-bold">{item.product.title}</p>
                <p>Price: {item.product.price}</p>
              </div>
            </td>
            <td className="border-2 p-2">
              <div className="flex flex-col justify-center items-center">
                <img
                  className="w-16"
                  src={`${import.meta.env.VITE_BASE_URL}${item.custom.logo}`}
                  alt=""
                />
                <p>Name: {item.custom.name}</p>
                <p>Email: {item.custom.email}</p>
                <p>Pass: {item.custom.pass}</p>
                <p>Mobile: {item.custom.mobile}</p>
                {item.custom.package && (
                  <p className="text-red-600 font-semibold">
                    Mobile: {item.custom.package}
                  </p>
                )}
                {item.custom.package ? (
                  <p className="text-green-600 font-semibold">Website</p>
                ) : (
                  <p className="text-blue-600 font-semibold">Apps</p>
                )}
              </div>
            </td>
            <td className="border-2 p-2 text-center ">
              <div>
                <p>
                  {item.payment.method} -- {item.payment.type}
                </p>
                <p>{item.payment.number}</p>
                <p></p>
                <p className="font-bold">
                  TransactionId: {item.payment.transactionId}
                </p>
                <p>Order Time: {item.orderTime}</p>
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
            {/* Action Area */}
            <th className="flex flex-col justify-center items-center gap-2 p-2">
              <button
                onClick={() => handleOrderDelivary(item)}
                className={`btn-xs p-1 rounded-md has-tooltip text-white ${
                  item.downloadStatus === true ? "bg-green-500" : "bg-red-300"
                }`}>
                <MdDeliveryDining />
              </button>
              <div className="relative inline-block text-left">
                <button
                  className="btn-xs has-tooltip p-1 rounded-md bg-secondary text-white"
                  onClick={() => handleStatusChange(item)}>
                  <FaEdit />
                </button>
              </div>
              <button
                onClick={() =>
                  HandleDeleteOrder(axiosSecure, refetch, item, "order")
                }
                className="btn-xs has-tooltip bg-red-600 p-1 rounded-md text-white">
                <FaTrash />
              </button>
            </th>
          </tr>
        ))}
      </Table>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default ManageOrder;
