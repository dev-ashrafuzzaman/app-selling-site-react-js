import { useForm } from "react-hook-form";
import Modal from "../../ui/Modal";
import { ErrorToast, SuccessToast } from "../../../utils/Toastify";
import useAuth from "../../../hooks/useAuth";
import useUserSecure from "../../../hooks/web/useUserSecure";
const ResellerApplyModal = ({ isOpen, setIsOpen }) => {
  const [axiosSecure] = useUserSecure();
  const { register, handleSubmit, reset } = useForm();
  const { WebUser } = useAuth();
  const onCancel = () => {
    reset();
    setIsOpen(false);
  };

  const onSubmit = async (data) => {

    // Check if image is provided
    if (!data.image || !data.image[0]) {
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
      ErrorToast("Please select a valid image file (JPEG, PNG, GIF, or JPG).");
      return;
    }

    // Check image size
    const imageSize = data.image[0].size / 1024; // in KB
    if (imageSize > 1500) {
      ErrorToast("Image size exceeds 1000KB limit.");
      return;
    }

    const formData = new FormData();
    formData.append("image", data.image[0]);
    formData.append("targetLink", "directLink");

    try {
      const response = await axiosSecure.post("/public/upload", formData);
      const reseller = {
        type: 'Reseller',
        resellerStatus: 'Pending',
        govId: data.govId,
        url: response.data.imageUrl
      }
      await axiosSecure
        .patch(`/api/v1/admin/user/reseller/${WebUser}`, {
          reseller
        })
        .then((data) => {
          if (data.data.modifiedCount > 0) {
            SuccessToast("Submit Success");
            reset();
            window.location.href = '/user/orders'
          } else {
            ErrorToast(data.data.Error);
          }
        });
    } catch (error) {
        console.log(error);
    }
    onCancel();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="RESELLER APPLY">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-5">
          <p className="text-red-500">
            জাতীয় পরিচয় / জন্মসনদ /পাসপোর্ট অনুযায়ী ফর্ম পূরণ করুন
          </p>
          <label htmlFor="title" className="mb-2">
            Assign to {WebUser}
          </label>

          <label className="form-control w-full">
            <div className="label">
              <span className="label-text">
                জাতীয় পরিচয় / জন্মসনদ /পাসপোর্ট নং
              </span>
            </div>
            <input
              type="text"
              {...register("govId", { required: true })}
              placeholder="জাতীয় পরিচয় / জন্মসনদ /পাসপোর্ট নং"
              className="input input-bordered w-full"
            />
          </label>
          <div className="flex flex-col border border-dashed p-2 mt-2 rounded-xl">
            <label className="font-bold">
              স্ক্যান কপি আপলোড করুন
              <span className="text-red-600"> Max size 1mb</span>
            </label>
            <div className="flex justify-between">
              <input
                type="file"
                {...register("image", { required: true })}
                name="image" // Add the name attribute
                className="file-input file-input-bordered w-full"
              />
            </div>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => onCancel()}
            type="button"
            className="btn btn-danger ">
            Cancel
          </button>
          <button type="submit" className="btn btn-success text-white ">
            submit
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ResellerApplyModal;
