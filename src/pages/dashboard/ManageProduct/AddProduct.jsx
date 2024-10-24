import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAxiosSecure from "../../../hooks/useAxiosSecure";
import { SuccessToast, ErrorToast } from "../../../utils/Toastify";
import { ToastContainer } from "react-toastify";
import SectionTitle from "../../../components/SectionTitle";
import ScreenLoad from "../../../components/ScreenLoad";
import { useState } from "react";

const AddProduct = () => {
  const [axiosSecure] = useAxiosSecure();
  const { register, handleSubmit, reset } = useForm();
  const [loading, setLoading] = useState(false);
  const [inputText, setInputText] = useState("");
  const [description, setDescription] = useState([]);
  const [category, setCategory] = useState("");
  const [isDemo, setIsDemo] = useState(false);
  const [isDiscount, setIsDiscount] = useState(false);
  const [selectedImages, setSelectedImages] = useState([]);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setInputText(e.target.value);
  };

  const handleAdd = () => {
    if (inputText.trim() !== "") {
      setDescription([...description, { text: inputText }]);
      setInputText("");
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setSelectedImages(files);
  };

  const onSubmit = async (data) => {
    setLoading(true);
    if (category === "") {
      alert("Category is required");
      setLoading(false);
      return;
    }

    // Check if images are provided
    if (selectedImages.length === 0) {
      setLoading(false);
      ErrorToast("Please select images.");
      return;
    }

    // Check if the files are images
    const allowedImageTypes = ["image/jpeg", "image/png", "image/gif", "image/jpg"];
    for (let file of selectedImages) {
      if (!allowedImageTypes.includes(file.type)) {
        setLoading(false);
        ErrorToast("Please select valid image files (JPEG, PNG, GIF, or JPG).");
        return;
      }
    }

    // Check image sizes
    for (let file of selectedImages) {
      const imageSize = file.size / 1024; // in KB
      if (imageSize > 10000) {
        setLoading(false);
        ErrorToast("One or more images exceed the 1000KB limit.");
        return;
      }
    }

    const formData = new FormData();
    selectedImages.forEach((image) => {
      formData.append("images", image);
    });

    try {
      const response = await axiosSecure.post("/public/upload/product", formData);
      const product = {
        categoryId: category,
        categoryName: category === "6650aabd63490d2bca547c21" ? "অ্যাপস" : "ওয়েবসাইট",
        demo: isDemo,
        demoLink: data.demoLink,
        details: data.details,
        discount: data.discount ? data.discount : 0,
        features: description,
        imageUrls: response?.data.imageUrls,
        isDiscount: isDiscount,
        password: data.password,
        pricePackage: category === "6650abfd63490d2bca547c24"
          ? [
              { name: "6 Month", price: data.halfMonth },
              { name: "12 Month", price: data.fullMonth },
            ]
          : [],
        price: parseInt(data.price) ? parseInt(data.price) : 0,
        title: data.title,
        userName: data.userName,
        video: data.video,
        status: true,
      };

      await axiosSecure.post(`/api/v1/admin/product`, { product }).then((data) => {
        if (data) {
          setLoading(false);
          SuccessToast("Upload Success");
          reset();
          setSelectedImages([]);
          setTimeout(() => {
            navigate("/leery/admin/dashboard/manage-products");
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
      {loading && <ScreenLoad />}
      <ToastContainer />
      <SectionTitle heading={"Add Product"} />

      <div className="bg-[#F0F3F4] rounded-xl md:p-10 p-4">
        <div className="md:flex gap-6 w-full">
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
              <button className="btn btn-success text-white" onClick={handleAdd}>
                Add
              </button>
            </div>
            <ul className="grid grid-cols-1 space-y-4">
              {description.map((item, index) => (
                <li key={index}>
                  {index + 1}{" "}
                  <span className="border-2 px-4 border-dashed border-black rounded-xl">
                    {item.text}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div>
            <div className="form-control w-full">
              <label className="label">
                <span className="label-text">Select Category*</span>
              </label>
              <select
                className="select select-bordered w-full"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>
                  Select Category
                </option>
                <option value="6650aabd63490d2bca547c21">অ্যাপস</option>
                <option value="6650abfd63490d2bca547c24">ওয়েবসাইট</option>
              </select>
              {!category && <span className="text-red-500">Category is required</span>}
            </div>
            <div className="md:flex gap-6">
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
                <>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">Price*</span>
                    </label>
                    <input
                      type="number"
                      defaultValue={0}
                      placeholder="Type here Amount"
                      {...register("price")}
                      className="input input-bordered w-full md:max-w-screen-2xl max-w-xs"
                    />
                  </div>
                </>
              ) : category === "6650abfd63490d2bca547c24" ? (
                <>
                  <div className="form-control w-full">
                    <label className="label">
                      <span className="label-text">6 Month Price*</span>
                    </label>
                    <input
                      type="number"
                      id="halfMonth"
                      defaultValue={0}
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
                      id="fullMonth"
                      defaultValue={0}
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
                    placeholder="Type here Amount"
                    className="input text-red-500 font-bold cursor-not-allowed input-bordered w-full md:max-w-screen-2xl max-w-xs"
                  />
                </div>
              )}
            </div>
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
            <div className="md:flex gap-6">
              <div className="form-control w-full">
                <label className="label">
                  <span className="label-text">Details*</span>
                </label>
                <textarea
                  type="text"
                  placeholder="Type here details"
                  {...register("details")}
                  className="textarea textarea-bordered w-full"
                />
              </div>
            </div>
            <div className="md:flex bg-red-100 rounded-2xl justify-center items-center gap-10 w-full border my-2 p-6">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Demo</span>
                </label>
                <input
                  type="checkbox"
                  onClick={() => setIsDemo(!isDemo)}
                  className="checkbox"
                />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Discount</span>
                </label>
                <input
                  type="checkbox"
                  onClick={() => setIsDiscount(!isDiscount)}
                  className="checkbox"
                />
              </div>
            </div>
            {isDemo && (
              <div className="md:flex gap-6">
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
            {isDiscount && (
              <div className="md:flex gap-6">
                <div className="form-control w-full">
                  <label className="label">
                    <span className="label-text">Discount %*</span>
                  </label>
                  <input
                    type="number"
                    defaultValue={0}
                    placeholder="Type here"
                    {...register("discount")}
                    className="input input-bordered w-full"
                  />
                </div>
              </div>
            )}
            {/* Image Upload */}
            <div className="flex flex-col p-2 ">
              <label className="font-bold">
                Product Images
                <span className="text-red-600">Max size 6MB each, max 5 images</span>
              </label>
              <div className="flex justify-between">
                <input
                  type="file"
                  {...register("image", { required: true })}
                  name="images"
                  multiple
                  onChange={handleImageChange}
                  className="file-input file-input-bordered w-full max-w-xs"
                />
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mt-4 mb-6">
              {selectedImages.map((image, index) => (
                <div key={index} className="relative w-24 h-24">
                  <img
                    src={URL.createObjectURL(image)}
                    alt={`Selected ${index + 1}`}
                    className="w-full h-full object-cover rounded"
                  />
                </div>
              ))}
            </div>
          </div>
          <div className="card-actions w-full">
            <button
              disabled={loading}
              type="submit"
              className="px-14 rounded-xl text-base w-full text-center bg-[#18BE71] hover:bg-[#54e7a3] py-2 text-white font-semibold cursor-pointer"
            >
              ADD NOW
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddProduct;