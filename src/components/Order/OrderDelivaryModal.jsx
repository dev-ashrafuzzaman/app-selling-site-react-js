import { useForm } from "react-hook-form";
import Modal from "../ui/Modal";
import { SuccessToast } from "../../utils/Toastify";
import { useState } from "react";

const OrderDeliveryModal = ({
  isOpen,
  setIsOpen,
  data,
  axiosSecure,
  refetch,
  setIsLoading,
  isLoading,
}) => {
  const { register, handleSubmit, reset, watch } = useForm();
  const [deliveryType, setDeliveryType] = useState("Website");

  const onCancel = () => {
    reset();
    setIsOpen(false);
    setIsLoading(false);
  };

  const onSubmit = async (input) => {
    setIsLoading(true);
    try {
      const statusData = {
        downloadStatus: true,
        status: "Complete",
        deliveryType,
        deliveryDetails: {},
      };

      if (deliveryType === "Website") {
        statusData.deliveryDetails = {
          link: input.websiteLink,
          adminPanelLink: input.adminPanelLink,
          username: input.username,
          password: input.password,
          videoLink: input.videoLink,
          note: input.note,
        };
      } else if (deliveryType === "Apps") {
        // Manually retrieve files from the DOM
        const appFile = document.getElementById("appFile").files[0];
        const adminPanelFile =
          document.getElementById("adminPanelFile").files[0];

        if (!appFile || !adminPanelFile) {
          console.error("Both app and admin panel files are required.");
          setIsLoading(false);
          return;
        }

        // Upload App File
        const appFormData = new FormData();
        appFormData.append("file", appFile);
        const appFileResponse = await axiosSecure.post(
          "/public/upload/file",
          appFormData
        );
        console.log(appFileResponse, "app file res");
        // Upload Admin Panel File
        const adminFormData = new FormData();
        adminFormData.append("file", adminPanelFile);
        const adminPanelFileResponse = await axiosSecure.post(
          "/public/upload/file",
          adminFormData
        );
        console.log(adminPanelFileResponse, "admin file res");
        statusData.deliveryDetails = {
          appFile: appFileResponse.data.fileName, // Assuming the API returns the file path or URL
          adminPanelFile: adminPanelFileResponse.data.fileName, // Assuming the API returns the file path or URL
          videoLink: input.videoLink,
          note: input.note,
        };
      }

      console.log(statusData, "apps");
      console.log(input, "inut");

      await axiosSecure
        .patch(`/api/v1/admin/order/delivary/${data._id}`, { statusData })
        .then((response) => {
          console.log(response);
          if (response) {
            reset();
            refetch();
            SuccessToast("Change Success");
          }
        });
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
      onCancel();
    }
  };

  const deliveryTypeFields = () => {
    if (deliveryType === "Website") {
      return (
        <>
          <div className="flex flex-col mb-3">
            <label htmlFor="websiteLink" className="mb-2">
              Website Link
            </label>
            <input
              type="text"
              {...register("websiteLink")}
              placeholder="Enter Website Link"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="adminPanelLink" className="mb-2">
              Admin Panel Link
            </label>
            <input
              type="text"
              {...register("adminPanelLink")}
              placeholder="Enter Admin Panel Link"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="username" className="mb-2">
              Admin Username
            </label>
            <input
              type="text"
              {...register("username")}
              placeholder="Enter Username"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="password" className="mb-2">
              Admin Password
            </label>
            <input
              type="password"
              {...register("password")}
              placeholder="Enter Password"
              className="input input-bordered w-full"
            />
          </div>
        </>
      );
    } else if (deliveryType === "Apps") {
      return (
        <>
          <div className="flex flex-col mb-3">
            <label htmlFor="appFile" className="mb-2">
              Upload Main App
            </label>
            <input
              type="file"
              id="appFile" // Add an id for manual access
              className="file-input file-input-bordered w-full"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="adminPanelFile" className="mb-2">
              Upload Admin App
            </label>
            <input
              type="file"
              id="adminPanelFile" // Add an id for manual access
              className="file-input file-input-bordered w-full"
            />
          </div>
        </>
      );
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Order Delivery">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-5">
          <label htmlFor="title" className="mb-2">
            Assign to {data?.uId}
          </label>
          <label htmlFor="title" className="mb-2 font-bold text-red-600">
            Please Select Delivary Type
          </label>
          <select
            {...register("deliveryType")}
            onChange={(e) => setDeliveryType(e.target.value)}
            className="select select-bordered w-full mb-5">
            <option value="Website">Website</option>
            <option value="Apps">Apps</option>
          </select>

          {deliveryTypeFields()}

          <div className="flex flex-col mb-3">
            <label htmlFor="videoLink" className="mb-2">
              Video Link
            </label>
            <input
              type="text"
              {...register("videoLink")}
              placeholder="Enter Video Link"
              className="input input-bordered w-full"
            />
          </div>
          <div className="flex flex-col mb-3">
            <label htmlFor="note" className="mb-2">
              Note
            </label>
            <textarea
              {...register("note")}
              placeholder="Enter any additional notes"
              className="textarea textarea-bordered w-full"></textarea>
          </div>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={() => onCancel()}
            type="button"
            className="btn btn-danger ">
            Cancel
          </button>
          {!isLoading && (
            <button type="submit" className="btn btn-success text-white ">
              Submit
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default OrderDeliveryModal;
