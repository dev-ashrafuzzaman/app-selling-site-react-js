import {
  MdAddCard,
  MdBlock,
  MdNotificationAdd,
  MdRefresh,
} from "react-icons/md";
import { ToastContainer } from "react-toastify";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { useForm } from "react-hook-form";
import { SuccessToast } from "../../../utils/Toastify";
import { HandleStatusChange } from "../../../utils/HandleStatusChange";
import useAdmin from "../../../hooks/useAdmin";
import { Link, useLoaderData } from "react-router-dom";
import WithdrawTable from "../../../components/Table/WithdrawTable";
import { FaBell, FaCoins, FaEdit, FaPowerOff, FaTrash } from "react-icons/fa";
import { useRef, useState } from "react";
import DirectSubmitTable from "../../../components/Table/DirectSubmitTable";
import HistoryTable from "../../../components/Table/HistoryTable";
import { HandleUserBonus } from "../../../utils/WebUsers/HandleUserBonus";
import { HandleNoticeSend } from "../../../utils/WebUsers/HandleNoticeSend";
import { HandleJobSubmitStatus } from "../../../utils/WebUsers/HandleJobSubmitStatus";
import SectionTitle from "../../../components/SectionTitle";
import TruckTable from "../../../components/ui/TruckTable";
const TrackCustomer = () => {
  const userInfo = useLoaderData();
  const { register, handleSubmit, reset } = useForm();
  const [axiosSecure] = useAxiosSecure();
  const [, refetch] = useAdmin();
  console.log(userInfo);
  const [bonusValue, setBonusValue] = useState({
    amount: "",
  });
  const modalRef = useRef(null);
  const [modalData, setModalData] = useState(null);
  const showModal = (data) => {
    setModalData(data);
    modalRef.current.showModal();
  };

  const [noticeValue, setNoticeValue] = useState({
    notice: "",
  });
  const modalRef4 = useRef(null);
  const [modalData4, setModalData4] = useState(null);

  const showModal4 = (data) => {
    setModalData4(data);
    modalRef4.current.showModal();
  };

  const modalRef1 = useRef(null);
  const [modalData1, setModalData1] = useState(null);
  const showModal1 = (data, id) => {
    setModalData1({ data, id });
    modalRef1.current.showModal();
  };

  const modalRef3 = useRef(null);
  const [modalData3, setModalData3] = useState(null);
  const [statusValue, setStatusValue] = useState();
  const showModal3 = (data) => {
    setModalData3(data);
    setStatusValue(data?.status);
    modalRef3.current.showModal();
  };

  const handleChange = (event) => {
    setStatusValue(event.target.value);
  };

  const onSubmit = async (data) => {
    try {
      const user = {
        userName: data.userName,
        sureName: data.sureName,
        email: data.email,
        mobile: data.mobile,
        altMobile: data.altMobile,
        password: data.password,
        address: data.address,
        city: data.city,
        state: data.state,
        whatsAppMobile: data.whatsAppMobile,
        status: true,
      };

      await axiosSecure.post("/api/v1/admin/user/", { user }).then((data) => {
        if (data.data.insertedId) {
          SuccessToast("Create Success");
          reset();
        }
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="my-10">
      <div className="md:flex items-center gap-4 bg-white rounded-2xl p-4 drop-shadow-xl">
        <div className="avatar">
          <div className="w-24 rounded-xl">
            <img
              src={"https://cdn-icons-png.flaticon.com/512/9187/9187604.png"}
            />
          </div>
        </div>
        <div className="space-y-2 ">
          <p className="text-sm font-extrabold">{userInfo?.user?.name}</p>
          <p className="text-sm text-gray-400">
            Joined: {userInfo?.user?.joinDate}
          </p>
        </div>
        <div className="w-full md:flex justify-end items-center gap-3 ">
          <div className="grid md:grid-cols-2 grid-cols-1 gap-2">
            <button
              onClick={() => showModal(userInfo?.user)}
              className="flex  items-center gap-2 btn btn-primary  btn-xs text-white">
              <MdAddCard></MdAddCard>Add Balance
            </button>
            <button
              onClick={() => showModal4(userInfo?.user)}
              className="flex  items-center gap-2 btn btn-accent  btn-xs text-white">
              <MdNotificationAdd></MdNotificationAdd>Send Notification
            </button>
            <button
              className={`flex  items-center gap-2 btn btn-xs tooltip text-white ${
                userInfo?.user?.status === true ? "btn-success" : "bg-slate-300"
              }`}
              onClick={() =>
                HandleStatusChange(
                  axiosSecure,
                  refetch,
                  userInfo?.user?._id,
                  "user",
                  !userInfo?.user?.status
                )
              }>
              <MdBlock></MdBlock>Ban User
            </button>
          </div>
        </div>
      </div>

      {/* User Profile */}
      <div className="w-full mt-4 drop-shadow-xl bg-white rounded-2xl md:p-10 p-4">
        <p className="text-2xl font-bold mb-10 flex items-center gap-2">
          Profile{" "}
          <span className="flex items-center gap-2 text-success border px-4 rounded-xl">
            <FaCoins></FaCoins>
            {parseFloat(userInfo?.user?.balance).toFixed(4)}
          </span>{" "}
          <button
            onClick={() =>
              (window.location.href = `/leery/admin/dashboard/track-user/${userInfo?.user?._id}`)
            }>
            <MdRefresh></MdRefresh>
          </button>
        </p>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="md:flex gap-6">
            <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
              <label className="label">
                <span className="label-text">Name*</span>
              </label>
              <input
                type="text"
                defaultValue={userInfo?.user?.name}
                readOnly
                placeholder="Type here name"
                {...register("sureName", { required: true })}
                className="input input-bordered w-full md:max-w-screen-2xl max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
              <label className="label">
                <span className="label-text">Email*</span>
              </label>
              <input
                type="email"
                defaultValue={userInfo?.user?.email}
                readOnly
                placeholder="Type here email"
                {...register("email")}
                className="input input-bordered w-full md:max-w-screen-2xl max-w-xs"
              />
            </div>
          </div>
          <div className="md:flex gap-6">
            <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
              <label className="label">
                <span className="label-text">Mobile No*</span>
              </label>
              <input
                type="text"
                defaultValue={userInfo?.user?.phone}
                readOnly
                placeholder="PhoMobilene"
                {...register("mobile", { required: true })}
                className="input input-bordered w-full md:max-w-screen-2xl max-w-xs"
              />
            </div>
            <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
              <label className="label">
                <span className="label-text">Refer Code*</span>
              </label>
              <input
                type="text"
                defaultValue={userInfo?.user?.referCode}
                readOnly
                placeholder="Ref code"
                {...register("refCode")}
                className="input input-bordered w-full md:max-w-screen-2xl max-w-xs"
              />
            </div>
          </div>
          <div className="my-4 space-y-3">
            <p className="font-bold text-success">
              Total Refer Network: {userInfo?.user?.refBy?.length}
            </p>
            <div className="grid md:grid-cols-6 grid-cols-2 text-center font-bold gap-4">
              {userInfo?.user?.refBy?.map((ref, index) => (
                <div className="border-2 border-dashed p-2" key={index}>
                  {ref}
                </div>
              ))}
            </div>
          </div>
        </form>
      </div>

      {userInfo?.user?.type == "reseller" ? (
        <>
          {/* User Withdraw */}
          <div className="w-full my-4 drop-shadow-xl bg-white rounded-2xl md:p-10 p-4">
            <p className="text-2xl font-bold mb-10">Withdraw List</p>

            <div className="overflow-x-auto bg-white md:p-6 rounded-2xl">
              <table className="table">
                <thead className="font-bold text-black">
                  <tr>
                    <th className="border-b-2 border-black">#</th>
                    <th className="border-b-2 border-black">User Info</th>
                    <th className="border-b-2 border-black">Withdraw Info</th>
                    <th className="border-b-2 border-black">Amounts</th>
                    <th className="border-b-2 border-black">Status</th>
                    <th className="border-b-2 border-black">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userInfo?.withdraw?.map((withdraw, index) => (
                    <WithdrawTable
                      key={withdraw._id}
                      data={withdraw}
                      sl={index}
                      refetch={refetch}
                      axiosSecure={axiosSecure}
                      global={userInfo.global}
                      user={userInfo.user}></WithdrawTable>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* User Direct Submit */}
          <div className="w-full my-4 drop-shadow-xl bg-white rounded-2xl md:p-10 p-4">
            <p className="text-2xl font-bold mb-10">Direct Submit List</p>

            <div className="overflow-x-auto bg-white p-6 rounded-2xl">
              <table className="table">
                <thead className="font-bold text-black text-sm">
                  <tr>
                    <th className="border-b-2 border-black">#</th>
                    <th className="border-b-2 border-black ">Visit Time</th>
                    <th className="border-b-2 border-black ">Submit Time</th>
                    <th className="border-b-2 border-black w-16">Prof</th>
                    <th className="border-b-2 border-black ">Status</th>
                    <th className="border-b-2 border-black">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userInfo?.directSubmit?.map((withdraw, index) => (
                    <DirectSubmitTable
                      key={withdraw._id}
                      data={withdraw}
                      sl={index}
                      refetch={refetch}
                      axiosSecure={axiosSecure}
                      showModal1={showModal1}></DirectSubmitTable>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* User History */}
          <div className="w-full my-4 drop-shadow-xl bg-white rounded-2xl md:p-10 p-4">
            <p className="text-2xl font-bold mb-10">History List</p>

            <div className="overflow-x-auto bg-white p-6 rounded-2xl">
              <table className="table">
                <thead className="font-bold text-black text-sm">
                  <tr>
                    <th className="border-b-2 border-black">#</th>
                    <th className="border-b-2 border-black ">Date Time</th>
                    <th className="border-b-2 border-black ">Post By</th>
                    <th className="border-b-2 border-black">Type</th>
                    <th className="border-b-2 border-black ">Amount</th>
                    <th className="border-b-2 border-black">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {userInfo?.history?.map((withdraw, index) => (
                    <HistoryTable
                      key={withdraw._id}
                      data={withdraw}
                      sl={index}
                      refetch={refetch}
                      axiosSecure={axiosSecure}></HistoryTable>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      ) : (
        <>
          <div>
            <SectionTitle heading={"Orders Management"}></SectionTitle>
            <TruckTable
              head={[
                "#",
                "Customer",
                "Product",
                "Orders",
                "Payment",
                "Status",
              ]}>
              {userInfo?.order?.map((item, index) => (
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
                      <a className="text-sky-600 font-bold cursor-pointer p-2">
                        View Details
                      </a>
                      <p className="font-bold">{item?.product?.title}</p>
                      <p>Price: {item?.product?.price}</p>
                    </div>
                  </td>
                  <td className="border-2 p-2">
                    <div className="flex flex-col justify-center items-center">
                      <img
                        className="w-16 "
                        src={`${import.meta.env.VITE_BASE_URL}${
                          item?.custom?.logo
                        }`}
                        alt=""
                      />
                      <p>Name: {item?.custom?.name}</p>
                      <p>Email: {item?.custom?.email}</p>
                      <p>Pass: {item?.custom?.pass}</p>
                      <p>Mobile: {item?.custom?.mobile}</p>
                      {item?.custom?.package && (
                        <p className="text-red-600 font-semibold">
                          Mobile: {item?.custom?.package}
                        </p>
                      )}
                      {item?.custom?.package ? (
                        <p className="text-green-600 font-semibold">Website</p>
                      ) : (
                        <p className="text-blue-600 font-semibold">Apps</p>
                      )}
                    </div>
                  </td>
                  <td className="border-2 p-2 text-center ">
                    <div>
                      <p>
                        {item?.payment?.method} -- {item?.payment?.type}
                      </p>
                      <p>{item?.payment?.number}</p>
                      <p></p>
                      <p className="font-bold">
                        TransactionId: {item?.payment?.transactionId}
                      </p>
                      <p>Order Time: {item?.orderTime}</p>
                    </div>
                  </td>
                  <td className="border-2 p-2 ">
                    <p
                      className={`border rounded-full ${
                        item?.status == "Pending"
                          ? "bg-purple-50 font text-purple-600"
                          : item?.status == "Processing"
                          ? "bg-blue-50 font text-blue-600"
                          : item?.status == "Complete"
                          ? "bg-green-50 font text-green-600"
                          : "bg-red-50 font text-red-600"
                      }`}>
                      {item?.status}
                    </p>
                  </td>
                </tr>
              ))}
            </TruckTable>
          </div>
        </>
      )}

      <ToastContainer></ToastContainer>

      <dialog id="my_modal" ref={modalRef} className="modal ">
        <div className="modal-box">
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-error text-white absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
          <h3 className="font-bold text-lg text-center my-5">Claim Balance</h3>
          <label className="input input-bordered flex items-center gap-2 my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70">
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              readOnly
              className="grow"
              defaultValue={modalData?.email}
              placeholder="Email"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM12.735 14c.618 0 1.093-.561.872-1.139a6.002 6.002 0 0 0-11.215 0c-.22.578.254 1.139.872 1.139h9.47Z" />
            </svg>
            <input
              type="text"
              required
              className="grow"
              defaultValue={0}
              onChange={(e) =>
                setBonusValue({ ...bonusValue, amount: e.target.value })
              }
            />
          </label>
          <button
            onClick={() =>
              HandleUserBonus(
                axiosSecure,
                refetch,
                modalData._id,
                bonusValue,
                modalRef,
                setBonusValue
              )
            }
            className="btn btn-success text-white my-2 w-full">
            Claim Balance
          </button>
        </div>
      </dialog>

      <dialog id="my_modal_1" ref={modalRef1} className="modal ">
        <div className="modal-box">
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-error text-white absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
          <h3 className="font-bold text-lg text-center my-5">Prof Image</h3>
          {modalData1?.id == "p1" ? (
            <>
              <img
                src={`${import.meta.env.VITE_BASE_URL}${
                  modalData1?.data?.prof1
                }`}
                alt=""
              />
            </>
          ) : modalData1?.id == "p2" ? (
            <>
              <img
                src={`${import.meta.env.VITE_BASE_URL}${
                  modalData1?.data?.prof2
                }`}
                alt=""
              />
            </>
          ) : (
            <>
              <img
                src={`${import.meta.env.VITE_BASE_URL}${
                  modalData1?.data?.prof
                }`}
                alt=""
              />
            </>
          )}
        </div>
      </dialog>

      <dialog id="jobS" ref={modalRef3} className="modal">
        <div className="modal-box">
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-error text-white absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
          <h3 className="font-bold text-lg text-center my-5">
            Job Submit Status Change
          </h3>
          <label className="input input-bordered flex items-center gap-2 my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70">
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              readOnly
              className="grow"
              defaultValue={modalData3?.uid}
              placeholder="Email"
            />
          </label>
          <select
            className="select select-bordered w-full"
            value={statusValue}
            onChange={handleChange}>
            <option disabled value={statusValue} hidden>
              {statusValue}
            </option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button
            onClick={() =>
              HandleJobSubmitStatus(
                axiosSecure,
                refetch,
                modalData3,
                statusValue,
                modalRef3
              )
            }
            className="btn btn-error text-white my-2 w-full">
            Status Change
          </button>
        </div>
      </dialog>

      <dialog id="my_modal_4" ref={modalRef4} className="modal ">
        <div className="modal-box">
          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn btn-sm btn-circle btn-error text-white absolute right-2 top-2">
                ✕
              </button>
            </form>
          </div>
          <h3 className="font-bold text-lg text-center my-5">Send Notice</h3>
          <label className="input input-bordered flex items-center gap-2 my-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 16 16"
              fill="currentColor"
              className="w-4 h-4 opacity-70">
              <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
              <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
            </svg>
            <input
              type="text"
              readOnly
              className="grow"
              defaultValue={modalData4?.email}
              placeholder="Email"
            />
          </label>
          <label className="input input-bordered flex items-center gap-2">
            <FaBell className="w-4 h-4 opacity-70"></FaBell>
            <input
              type="text"
              required
              className="grow"
              defaultValue={""}
              onChange={(e) =>
                setNoticeValue({ ...noticeValue, notice: e.target.value })
              }
            />
          </label>
          <button
            onClick={() =>
              HandleNoticeSend(
                axiosSecure,
                modalData4._id,
                noticeValue,
                modalRef4
              )
            }
            className="btn btn-success text-white my-2 w-full">
            Send Notice
          </button>
        </div>
      </dialog>
    </div>
  );
};

export default TrackCustomer;
