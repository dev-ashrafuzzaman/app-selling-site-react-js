import { useForm } from "react-hook-form";
import Modal from "../ui/Modal";
import Swal from "sweetalert2";
import { SuccessToast } from "../../utils/Toastify";
const OrderStatusModal = ({ isOpen, setIsOpen, data,axiosSecure ,refetch}) => {
  const { register, handleSubmit, reset } = useForm();

  const onCancel = () => {
    reset();
    setIsOpen(false);
  };

  const onSubmit =async (input) => {
    const result = await Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, Change it!'
    });

    if (result.isConfirmed) {
        try {
            const statusData = {
                status: input.status
            };
    
            await axiosSecure.patch(`/api/v1/admin/${'order'}/status/${data._id}`, {statusData})
                .then(data => {
                    if (data.data.modifiedCount > 0) {
                        refetch()
                        SuccessToast('Change Success')
                    }
                })
    
        } catch (error) {
            console.error(error);
        }
       
    }
    onCancel();
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Order Status Change">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col mb-5">
          <label htmlFor="title" className="mb-2">
            Assign to {data?.uId}
          </label>
          <select
            className="select select-bordered w-full"
            id="status"
            {...register("status")}>
            <option value="Processing">Processing</option>
            <option value="Cencel">Cencel</option>
          </select>
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

export default OrderStatusModal;
