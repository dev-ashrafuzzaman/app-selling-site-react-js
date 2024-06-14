import { useForm } from "react-hook-form";
import Modal from "../ui/Modal";
import { SuccessToast } from "../../utils/Toastify";
const OrderDelivaryModal = ({
  isOpen,
  setIsOpen,
  data,
  axiosSecure,
  refetch,
  setIsLoading,
  isLoading,
}) => {
  const { register, handleSubmit, reset } = useForm();

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
        link: input.link,
        status: "Complete",
      };

      await axiosSecure
        .patch(`/api/v1/admin/${"order"}/delivary/${data._id}`, { statusData })
        .then((data) => {
          if (data) {
            reset();
            refetch();
            SuccessToast("Change Success");
          }
        });
    } catch (error) {
      setIsLoading(false);
      console.error(error);
    }
    setIsLoading(false);
    onCancel();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Order Delivary Link">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-5">
          <label htmlFor="title" className="mb-2">
            Assign to {data?.uId}
          </label>

          <input
            type="text"
            defaultValue={data?.link}
            {...register("link")}
            placeholder="Download Link Type here"
            className="input input-bordered w-full"
          />
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
              submit
            </button>
          )}
        </div>
      </form>
    </Modal>
  );
};

export default OrderDelivaryModal;
