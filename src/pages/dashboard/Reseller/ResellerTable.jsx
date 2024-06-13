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
import { useLocation } from "react-router-dom";
import useReseller from "../../../hooks/useReseller";
import ResellerSubmitModal from "./ResellerSubmitModal";

const ResellerTable = () => {
  const [axiosSecure] = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [isDelivaryOpen, setIsDelivaryOpen] = useState(false);
  const [isProductViewOpen, setIsProductViewOpen] = useState(false);
  const { isSingleProduct } = useSingleProduct();
  console.log(isSingleProduct);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const type = params.get("type");

  const initialPage = 1;
  const initialPageSize = 10;
  const initialSearchQuery = "";
  const {
    isReseller,
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
  } = useReseller(initialPage, initialPageSize, initialSearchQuery, type);

  console.log(isReseller);
  const [selectedOrder, setSelectedOrder] = useState({});

  const handleStatusChange = (order) => {
    setSelectedOrder(order);
    setIsOpen(!isOpen);
  };

  const handleSubmitView = (order) => {
    setSelectedOrder(order);
    setIsProductViewOpen(!isProductViewOpen);
  };

  return (
    <div>
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
      />
      <ResellerSubmitModal
        isOpen={isProductViewOpen}
        setIsOpen={setIsProductViewOpen}
        data={selectedOrder}
      />
      {isOrdersLoading && <ScreenLoad />}
      <SectionTitle heading={"Reseller Management"} />
      <Table
        head={[
          "#",
          "Reseller",
          "Submit",
          "Balance",
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
        {isReseller?.data?.map((item, index) => (
          <tr
            key={index}
            className="border-2 hover:bg-slate-100 text-lg text-center">
            <th className="border-2 p-2">{index + 1}</th>
            <td className="border-2 p-2">
              <a
                href={`/leery/admin/dashboard/track-user/${item?.email}`}
                className="text-sky-600 font-bold cursor-pointer p-2"
                target="_blank">
                {item?.email}
              </a>
              <p>Name: {item?.name}</p>
              <p>Mobile: {item?.phone}</p>
              <p>Join: {item?.joinDate}</p>
            </td>
            <td className="border-2 p-2">
              <div>
                <button
                  onClick={() => handleSubmitView(item)}
                  className="text-sky-600 font-bold cursor-pointer p-2">
                  View Details
                </button>
                <p>Gov ID: {item?.govId}</p>
              </div>
            </td>
            <td>
              <p className="bg-green-50 px-6 border border-green-500 rounded-full">{item?.balance}</p>
            </td>
            <td className="border-2 p-2">
              <p
                className={`border rounded-full ${
                  item?.resellerStatus === "Pending"
                    ? "bg-purple-50 font text-purple-600"
                    : item?.resellerStatus === "Processing"
                    ? "bg-blue-50 font text-blue-600"
                    : item?.resellerStatus === "Approved"
                    ? "bg-green-50 font text-green-600"
                    : "bg-red-50 font text-red-600"
                }`}>
                {item?.resellerStatus}
              </p>
            </td>
            {/* Action Area */}
            <th className="flex flex-col justify-center items-center gap-2 p-2">
              <button
                onClick={() => handleOrderDelivary(item)}
                className={`btn-xs p-1 rounded-md has-tooltip text-white ${
                  item?.downloadStatus === true ? "bg-green-500" : "bg-red-300"
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
    </div>
  );
};

export default ResellerTable;
