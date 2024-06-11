import React from "react";
import useOrders from "../../../hooks/useOrders";
import Table from "../../../components/ui/Table";
import { FaCoins, FaEdit, FaPowerOff, FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { MdPassword } from "react-icons/md";
import SectionTitle from "../../../components/SectionTitle";

const ManageOrder = () => {
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

  console.log(isOrders);
  return (
    <div>
      <SectionTitle heading={"Orders Management"}></SectionTitle>
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
                <a
                  className="text-sky-600 font-bold cursor-pointer p-2"
                  target="_blank"
                  href={`/leery/admin/dashboard/product/${item.product.categoryId}`}>
                  View Details
                </a>
                <p className="font-bold">{item.product.title}</p>
                <p>Price: {item.product.price}</p>
              </div>
            </td>
            <td className="border-2 p-2">
              <div className="flex flex-col justify-center items-center">
                <img
                  className="w-16 "
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
            <td className="border-2 p-2 ">
              <p
                className={`border rounded-full ${
                  item.status == "Pending"
                    ? "bg-purple-50 font text-purple-600"
                    : item.status == "Processing"
                    ? "bg-blue-50 font text-blue-600"
                    : item.status == "Complete"
                    ? "bg-green-50 font text-green-600"
                    : "bg-red-50 font text-red-600"
                }`}>
                {item.status}
              </p>
            </td>
            {/* Action Area */}
            <th className="flex flex-col justify-center items-center gap-2 p-2">
              <button
                className={`btn-xs p-1 rounded-md has-tooltip  text-white ${
                  item.status === true ? "btn-success" : "bg-slate-300"
                }`}>
                <FaPowerOff></FaPowerOff>
              </button>
              <Link
                to={`/leery/admin/dashboard/track-user/${item._id}`}
                className="btn-xs has-tooltip p-1 rounded-md bg-secondary text-white">
                <FaEdit></FaEdit>
              </Link>
              <button className="btn-xs has-tooltip bg-red-600 p-1 rounded-md  text-white">
                <FaTrash></FaTrash>
              </button>
            </th>
          </tr>
        ))}
      </Table>
    </div>
  );
};

export default ManageOrder;
