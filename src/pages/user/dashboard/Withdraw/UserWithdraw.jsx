import { useNavigate, useParams } from "react-router-dom";
import useWebUser from "../../../../hooks/web/useWebUser";
import { useState } from "react";
import { ErrorToast, SuccessToast } from "../../../../utils/Toastify";
import { ToastContainer } from "react-toastify";
import useUserSecure from "../../../../hooks/web/useUserSecure";
import ScreenLoad from "../../../../components/ScreenLoad";
import { softInfo } from "../../../../utils/info";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const UserWithdraw = () => {
  const { register, handleSubmit, reset } = useForm();
  const [axiosSecure] = useUserSecure();
  const navigate = useNavigate();
  const [isWebUser] = useWebUser();
  const [btnActive, setActive] = useState(false);

  const onSubmit = async (data) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Withdraw!",
    });

    if (result.isConfirmed) {
      setActive(true);
      try {
        const withdraw = {
          amount: data.amount,
          number: data.number,
          uid: isWebUser.user.id,
          method: data.method,
          currency: softInfo?.currency,
        };

        await axiosSecure
          .post(`${import.meta.env.VITE_BASE_URL}/api/v1/web/user/withdraw`, {
            withdraw,
          })
          .then((data) => {
            if (data.data.insertedId) {
              SuccessToast("Withdraw Success");
              reset();
              const timeoutId = setTimeout(() => {
                setActive(false);
                navigate("/user/auth/dashboard/withdraw-history");
              }, 2000);
              setTimeout(() => {
                clearTimeout(timeoutId);
              }, 2000);
            } else {
              setActive(false);
              ErrorToast(data.data.Error);
            }
          });
      } catch (error) {
        setActive(false);
        console.error(error);
      }
    }
  };

  console.log(isWebUser);
  return (
    <>
      {" "}
      {btnActive && <ScreenLoad></ScreenLoad>}
      <div className="max-w-screen-sm mx-auto flex justify-center items-center my-10">
        <div>
          <div className="card bg-base-100 shadow-xl drop-shadow-lg border-2 border-dashed">
            <div className="card-body">
              <div className="space-y-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col mb-5">
                    <label className="label">
                      <span className="label-text">
                        Select Payment Channel*
                      </span>
                    </label>
                    <select
                      className="select select-bordered w-full"
                      id="method"
                      {...register("method")}>
                      {isWebUser?.global?.paymentMathod?.map((item, index) => (
                        <option key={index} value={item?.name}>
                          {item?.name}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="flex flex-col mb-5">
                    <label className="label">
                      <span className="label-text">Select Payment Type*</span>
                    </label>
                    <select
                      className="select select-bordered w-full"
                      id="payType"
                      {...register("payType")}>
                      <option value="Personal">Personal</option>
                      <option value="Agent">Agent</option>
                    </select>
                  </div>
                  <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                    <label className="label">
                      <span className="label-text">Number*</span>
                    </label>
                    <input
                      type="number"
                      defaultValue={0}
                      placeholder="Type here Number"
                      {...register("number")}
                      className="input input-bordered w-full md:max-w-screen-2xl max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full max-w-xs md:max-w-screen-2xl">
                    <label className="label">
                      <span className="label-text">Amount*</span>
                    </label>
                    <input
                      type="number"
                      defaultValue={0}
                      placeholder="Type here Amount"
                      {...register("amount")}
                      className="input input-bordered w-full md:max-w-screen-2xl max-w-xs"
                    />
                  </div>
                  <div className="w-full my-4">
                    <button
                      disabled={btnActive}
                      type="submit"
                      className="btn btn-success text-white w-full">
                      Withdraw
                    </button>
                  </div>
                </form>
              </div>
            </div>
            <div className="bg-gray-100 p-2 rounded-b-xl space-y-2">
              <p className="font-bold mb-4 text-center text-xl">
                Withdraw Rules
              </p>
              <p className="border-2 p-2 border-dashed border-white">
                1. Withdraw Minimum Amount:{" "}
                <span className="font-bold">
                  {isWebUser?.global?.withdrawRules?.minAmount}
                </span>{" "}
              </p>
              <p className="border-2 p-2 border-dashed border-white">
                2. Withdraw Maximum Amount:{" "}
                <span className="font-bold">
                  {isWebUser?.global?.withdrawRules?.maxAmount}
                </span>
              </p>
              <p className="border-2 p-2 border-dashed border-white">
                3. Withdraw Charge:{" "}
                <span className="font-bold">
                  {isWebUser?.global?.withdrawRules?.outAmount}
                </span>
              </p>
              <p className="border-2 p-2 border-dashed border-white">
                4. Minimum Refer Member:{" "}
                <span className="font-bold">
                  {isWebUser?.global?.withdrawRules?.minRef}
                </span>
              </p>
              <p className="border-2 p-2 border-dashed border-white">
                5. Withdraw Time:{" "}
                <span className="font-bold">
                  {isWebUser?.global?.withdrawRules?.withTime}
                </span>
              </p>
            </div>
          </div>
        </div>
        <ToastContainer></ToastContainer>
      </div>
    </>
  );
};

export default UserWithdraw;
