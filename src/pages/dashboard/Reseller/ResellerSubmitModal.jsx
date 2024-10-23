import Modal from "../../../components/ui/Modal";

const ResellerSubmitModal = ({ isOpen, setIsOpen, data }) => {
  const onCancel = () => {
    setIsOpen(false);
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Submit Details">
      <form>
        <div className="max-w-screen-2xl mx-auto py-4">
            <p>Assign to: {data.email}</p>
           <p className="font-semibold text-red-600">Gov Id: {data.govId}</p>
          <figure className="bg-slate-100 p-4 rounded-xl">
            <img
              src={`${import.meta.env.VITE_BASE_URL}${data?.url}`}
              alt="Modal Image"
              className="mx-auto  object-cover rounded-md"
            />
          </figure>
        </div>
        <div className="flex gap-3 justify-end">
          <button
            onClick={''}
            type="button"
            className="btn bg-green-500  text-white">
            Download
          </button>
          <button
            onClick={() => onCancel()}
            type="button"
            className="btn bg-red-500  text-white">
            Cancel
          </button>
        </div>
      </form>
    </Modal>
  );
};

export default ResellerSubmitModal;
