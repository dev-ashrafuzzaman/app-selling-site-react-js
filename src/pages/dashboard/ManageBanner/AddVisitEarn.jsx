import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { SuccessToast } from "../../../utils/Toastify";
import { ToastContainer } from "react-toastify";
import SectionTitle from "../../../components/SectionTitle";
import { ErrorToast } from "../../../utils/Toastify";
import ScreenLoad from "../../../components/ScreenLoad";
import { useState } from "react";
import useVisitEarn from "../../../hooks/useVisitEarn";

const AddVisitEarn = () => {
  const [axiosSecure] = useAxiosSecure();
  const { isVisitEarn} = useVisitEarn(10, 1, '');


  const { register, handleSubmit, reset } = useForm();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onSubmit = async (data) => {
    setLoading(true);

    // Check if image is provided
    if (!data.image || !data.image[0]) {
      setLoading(false);
      ErrorToast("Please select an image.");
      return;
    }

    // Check if the file is an image
    const allowedImageTypes = [
      "image/jpeg",
      "image/png",
      "image/gif",
      "image/jpg",
    ];
    if (!allowedImageTypes.includes(data.image[0].type)) {
      setLoading(false);
      ErrorToast("Please select a valid image file (JPEG, PNG, GIF, or JPG).");
      return;
    }

    // Check image size
    const imageSize = data.image[0].size / 1024; // in KB
    if (imageSize > 4000) {
      setLoading(false);
      ErrorToast("Image size exceeds 1000KB limit.");
      return;
    }

    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("targetLink", "banner");

    try {
      const response = await axiosSecure.post("/public/upload", formData);
      const banner = {
        url: response.data.imageUrl,
        status: true,
      };
      await axiosSecure
        .patch(`/api/v1/admin/banner`, { banner })
        .then((data) => {
          if (data) {
            setLoading(false);
            SuccessToast("Upload Success");
            reset();
            setTimeout(() => {
              navigate("/leery/admin/dashboard/manage-banner");
            }, 2000);
          } else {
            setLoading(false);
            ErrorToast(data.data.Error);
          }
        });
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <div className="w-full py-10 md:px-10 px-2">
      {loading && <ScreenLoad></ScreenLoad>}
      <ToastContainer></ToastContainer>
      <SectionTitle heading={"Add Banner"}></SectionTitle>
      {isVisitEarn?.data?.length >= 3 ? <><p className="text-red-500 font-bold text-center text-2xl">You Have Rech To Add Banner Max 3 Banner Add You Please Check Manage Page Thank you...</p></>: <>
        <div className=" bg-[#F0F3F4] rounded-xl md:p-10 p-4">
        <div className="my-4 space-y-4"></div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="flex flex-col border border-dashed p-2">
              <label className="font-bold">
                Banner
                <span className="text-red-600">Max size 500kb</span>
              </label>
              <div className="flex justify-between">
                <input
                  type="file"
                  {...register("image", { required: true })}
                  name="image" // Add the name attribute
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              </div>
            </div>
          </div>
          <div className="card-actions w-full">
            <button
              type="submit"
              className="px-14 text-base w-full text-center  bg-[#18BE71] hover:bg-[#54e7a3] py-2 text-white font-semibold rounded-full cursor-pointer">
              Upload Now
            </button>
          </div>
        </form>
      </div>
      </>}
     
    </div>
  );
};

export default AddVisitEarn;
