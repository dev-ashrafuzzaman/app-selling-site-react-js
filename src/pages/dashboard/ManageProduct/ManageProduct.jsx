import Table from "../../../components/ui/Table";
import { FaEdit, FaPowerOff, FaTrash } from "react-icons/fa";
import SectionTitle from "../../../components/SectionTitle";
import useProducts from "../../../hooks/useProducts";
import { HandleStatusChange } from "../../../utils/HandleStatusChange";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { ToastContainer } from "react-toastify";
import { HandleDeleteProduct } from "../../../utils/HandleDelete";
import SingleProductEditModal from "../../../components/Product/SingleProductEditModal";
import { useState } from "react";

const ManageProduct = () => {
  const [axiosSecure] = useAxiosSecure();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const {
    isProducts,
    refetch,
    isProductsLoading,
    currentPage,
    setCurrentPage,
    pageSize,
    setPageSize,
    searchQuery,
    setSearchQuery,
    totalPages,
    totalCount,
  } = useProducts();



  const handleProductEdit = (data) => {
    setSelectedProduct(data);
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <SingleProductEditModal
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        data={selectedProduct}
        refetch={refetch}
        setIsLoading={setIsLoading}
        isLoading={isLoading}
      />

      <SectionTitle heading={"Product Management"}></SectionTitle>
      <Table
        head={["#", "Image", "Product", "Demo", "Discount", "Status", "Action"]}
        refetch={refetch}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        pageSize={pageSize}
        setPageSize={setPageSize}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        totalPages={totalPages}
        totalCount={totalCount}>
        {isProducts?.data?.map((item, index) => (
          <tr
            key={index}
            className="border-2 hover:bg-slate-100 text-lg text-center">
            <th className="border-2 p-2">{index + 1}</th>
            <td className="border-2 p-2">
              <img
                className="w-16"
                src={`${import.meta.env.VITE_BASE_URL}${item.imageUrls[0]}`}
                alt=""
              />
            </td>
            <td className="border-2 p-2">
              <div>
                {item?.categoryId == "6650aabd63490d2bca547c21" ? (
                  <p className="text-blue-600 font-semibold">Apps</p>
                ) : (
                  <p className="text-green-600 font-semibold">Website</p>
                )}
                <p className="font-bold">{item?.title}</p>
                {item?.categoryId == "6650aabd63490d2bca547c21" ? (
                  <p className="border rounded-full bg-green-50 font-semibold">
                    {item?.price}
                  </p>
                ) : (
                  <div className="text-red-600 font-semibold">
                    {item?.pricePackage.map((price, index) => (
                      <div key={index}>
                        <p>
                          {price.name} -- {price.price}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </td>
            <td className="border-2 p-2">
              <div className="flex flex-col justify-center items-center">
                <p>
                  Demo Link:{" "}
                  <a
                    href={item?.demoLink}
                    target="_blank"
                    className="text-blue-500">
                    Click Hare
                  </a>{" "}
                </p>
                <p>Username: {item?.userName}</p>
                <p>Pass: {item?.password}</p>

                {item?.custom?.package && (
                  <p className="text-red-600 font-semibold">
                    Package: {item?.custom?.package}
                  </p>
                )}
              </div>
            </td>
            <td className="border-2 p-2 text-center ">
              <p className="font-bold">Discount: {item?.discount} %</p>
              <div className="font-bold">
                Discount after Price:{" "}
                {item?.categoryId == "6650aabd63490d2bca547c21" ? (
                  <>
                    {" "}
                    {parseInt(
                      item?.price - (item?.price * item?.discount) / 100
                    )}
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-1 gap-1">
                      {item?.pricePackage.map((pack, index) => (
                        <span
                          className="bg-green-50 border border-dashed p-2 "
                          key={index}>
                          Package {index + 1} -{" "}
                          {parseInt(
                            pack?.price - (pack?.price * item?.discount) / 100
                          )}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </td>
            <td className="border-2 p-2 ">
              <p
                className={`border rounded-full font-semibold ${
                  item.status == "Pending"
                    ? "bg-purple-50 font text-purple-600"
                    : item.status == "Processing"
                    ? "bg-blue-50 font text-blue-600"
                    : item.status == true
                    ? "bg-green-50 font text-green-600"
                    : "bg-red-50 font text-red-600"
                }`}>
                {item?.status == true ? "Active" : "De-Active"}
              </p>
            </td>
            {/* Action Area */}
            <th className="flex flex-col justify-center items-center gap-2 p-2">
              <button
                onClick={() =>
                  HandleStatusChange(
                    axiosSecure,
                    refetch,
                    item._id,
                    "product",
                    !item.status
                  )
                }
                className={`btn btn-xs p-1 rounded-md  text-white ${
                  item?.status === true ? "btn-success" : "bg-slate-300"
                }`}>
                <FaPowerOff></FaPowerOff>
              </button>
              <div className="relative inline-block text-left">
                <button
                  className="btn-xs has-tooltip p-1 rounded-md bg-blue-600 text-white"
                  onClick={() => handleProductEdit(item)}>
                  <FaEdit />
                </button>
              </div>
              {/* <Link
                to={`/leery/admin/dashboard/track-user/${item?._id}`}
                className="btn-xs has-tooltip p-1 rounded-md bg-secondary text-white">
                <FaEdit></FaEdit>
              </Link> */}
              <button
                onClick={() =>
                  HandleDeleteProduct(axiosSecure, refetch, item, "product")
                }
                className="btn-xs has-tooltip bg-red-600 p-1 rounded-md  text-white">
                <FaTrash></FaTrash>
              </button>
            </th>
          </tr>
        ))}
      </Table>
      <ToastContainer></ToastContainer>
    </div>
  );
};

export default ManageProduct;
