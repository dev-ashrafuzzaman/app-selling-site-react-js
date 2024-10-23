import { useForm } from "react-hook-form";
import Modal from "../ui/Modal";
import { ErrorToast, SuccessToast } from "../../utils/Toastify";
import { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const SingleProductEditModal = ({
  isOpen,
  setIsOpen,
  data,
  refetch,
  setIsLoading,
  isLoading,
}) => {
  const [axiosSecure] = useAxiosSecure();
  const { register, handleSubmit, reset, setValue } = useForm();
  const [category, setCategory] = useState("");
  const [productId, setProductId] = useState(data._id);
  const [isDemo, setIsDemo] = useState(false);
  const [isDiscount, setIsDiscount] = useState(false);
  const [description, setDescription] = useState([]);
  const [inputText, setInputText] = useState("");

  useEffect(() => {
    if (data) {
      setCategory(data.categoryId);
      setProductId(data._id);
      setIsDemo(data.demo);
      setIsDiscount(data.isDiscount);
      setDescription(data.features || []);
      setValue("title", data.title);
      setValue("price", data.price);
      setValue("video", data.video);
      setValue("details", data.details);
      setValue("demoLink", data.demoLink);
      setValue("userName", data.userName);
      setValue("password", data.password);
      setValue("discount", data.discount);
      if (data.pricePackage?.length > 0) {
        setValue("halfMonth", data.pricePackage[0].price);
        setValue("fullMonth", data.pricePackage[1].price);
      }
    }
  }, [data, setValue]);

  // Handle feature input text change
  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  // Handle adding a feature
  const handleAdd = (e) => {
    e.preventDefault(); // Prevent form submission
    if (inputText.trim() !== "") {
      setDescription([...description, { text: inputText }]);
      setInputText("");
    }
  };

  // Handle removing a feature
  const handleDelete = (index) => {
    const newDescription = description.filter((_, i) => i !== index);
    setDescription(newDescription);
  };

  const onCancel = () => {
    reset();
    setIsOpen(false);
    setIsLoading(false);
    setIsDiscount(false);
    setIsDemo(false);
    setCategory("");
  };

  const onSubmit = async (formData) => {
    setIsLoading(true);
    try {
      const product = {
        categoryId: category,
        demo: isDemo,
        demoLink: formData.demoLink,
        details: formData.details,
        discount: formData.discount || 0,
        features: description,
        isDiscount,
        password: formData.password,
        pricePackage:
          category === "6650abfd63490d2bca547c24"
            ? [
                { name: "6 Month", price: formData.halfMonth },
                { name: "12 Month", price: formData.fullMonth },
              ]
            : [],
        price: parseInt(formData.price) || 0,
        title: formData.title,
        userName: formData.userName,
        video: formData.video,
        status: true,
      };

      await axiosSecure
        .patch(`/api/v1/admin/product/edit/${productId}`, { product })
        .then((data) => {
          if (data) {
            refetch();
            setIsLoading(false);
            SuccessToast("Update Success");
            reset();
            onCancel();
          } else {
            setIsLoading(false);
            ErrorToast(data.data.Error);
          }
        });
    } catch (error) {
      setIsLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Product Update">
      <div className="bg-[#F0F3F4] rounded-xl md:p-10 p-4 mt-4">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            {/* Features Section */}
            <div className="my-4 space-t-4 w-full">
              <label className="label">
                <span className="label-text">Features*</span>
              </label>
              <div className="md:flex gap-6 mb-4">
                <input
                  type="text"
                  value={inputText}
                  onChange={handleChange}
                  placeholder="Enter Features"
                  className="input input-bordered w-full"
                />
                <button
                  className="btn btn-success text-white"
                  onClick={handleAdd}
                  type="button" // Ensure this button doesn't trigger form submission
                >
                  Add
                </button>
              </div>
              <ul className="grid grid-cols-1 space-y-4">
                {description.map((item, index) => (
                  <li key={index}>
                    {index + 1}.{" "}
                    <span className="border-2 px-4 border-dashed border-black rounded-xl">
                      {item.text}
                    </span>
                    <button
                      type="button"
                      className="ml-2 text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(index)}
                    >
                      Delete
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Title and Price Section */}
            <div className="gap-6">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Title*</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here name"
                  {...register("title", { required: true })}
                  className="input input-bordered w-full md:max-w-screen-2xl max-w-xs"
                />
              </div>
              {category === "6650aabd63490d2bca547c21" ? (
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Price*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Type here Amount"
                    {...register("price")}
                    className="input input-bordered w-full md:max-w-screen-2xl max-w-xs"
                  />
                </div>
              ) : category === "6650abfd63490d2bca547c24" ? (
                <>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">6 Month Price*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Type here Amount"
                      {...register("halfMonth")}
                      className="input input-bordered w-full md:max-w-screen-2xl max-w-xs"
                    />
                  </div>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">12 Month Price*</span>
                    </label>
                    <input
                      type="number"
                      placeholder="Type here Amount"
                      {...register("fullMonth")}
                      className="input input-bordered w-full md:max-w-screen-2xl max-w-xs"
                    />
                  </div>
                </>
              ) : (
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text text-red-500">Notice*</span>
                  </label>
                  <input
                    type="text"
                    readOnly
                    defaultValue="Please Select Category Then Apply Price"
                    className="input text-red-500 font-bold cursor-not-allowed input-bordered w-full md:max-w-screen-2xl max-w-xs"
                  />
                </div>
              )}
            </div>

            {/* Video Link Section */}
            <div className="md:flex gap-6">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Video Link*</span>
                </label>
                <input
                  type="text"
                  placeholder="Type here https://www.youtube.com/"
                  {...register("video", { required: true })}
                  className="input input-bordered w-full"
                />
              </div>
            </div>

            {/* Details Section */}
            <div className="md:flex gap-6">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Details*</span>
                </label>
                <textarea
                  placeholder="Type here details"
                  {...register("details")}
                  className="textarea textarea-bordered w-full"
                />
              </div>
            </div>

            {/* Demo and Discount Section */}
            <div className="md:flex bg-red-100 rounded-2xl justify-center items-center gap-10 w-full border my-2 p-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Demo</span>
                </label>
                <input
                  checked={isDemo}
                  type="checkbox"
                  onChange={() => setIsDemo(!isDemo)}
                  className="checkbox"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Discount</span>
                </label>
                <input
                  checked={isDiscount}
                  type="checkbox"
                  onChange={() => setIsDiscount(!isDiscount)}
                  className="checkbox"
                />
              </div>
            </div>

            {/* Demo Input Fields */}
            {isDemo && (
              <div className="gap-6">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Demo Link*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here https://"
                    {...register("demoLink")}
                    className="input input-bordered w-full md:max-w-screen-2xl max-w-xs"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">User Name*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    {...register("userName")}
                    className="input input-bordered w-full md:max-w-screen-2xl max-w-xs"
                  />
                </div>
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Password*</span>
                  </label>
                  <input
                    type="text"
                    placeholder="Type here"
                    {...register("password")}
                    className="input input-bordered w-full md:max-w-screen-2xl max-w-xs"
                  />
                </div>
              </div>
            )}

            {/* Discount Input Field */}
            {isDiscount && (
              <div className="md:flex gap-6 mb-4">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Discount %*</span>
                  </label>
                  <input
                    type="number"
                    placeholder="Type here"
                    {...register("discount")}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 justify-end mt-4">
            <button
              onClick={onCancel}
              type="button"
              className="btn bg-red-500 text-white"
            >
              Cancel
            </button>
            {!isLoading && (
              <button type="submit" className="btn btn-success text-white">
                Update
              </button>
            )}
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default SingleProductEditModal;
