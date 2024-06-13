import { useForm } from "react-hook-form";
import Modal from "../ui/Modal";

const ProductViewModal = ({
  isOpen,
  setIsOpen,
  data,
  product
}) => {

const singleProduct = product?.find(item=> item?._id === data?.product?.productId)

  const onCancel = () => {
    setIsOpen(false);
  };

 

  return (
    <Modal isOpen={isOpen} setIsOpen={setIsOpen} title="Product Details">
      <form>
      <div className="max-w-screen-2xl mx-auto px-2 pt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <figure className="bg-slate-100 p-4 rounded-xl">
            <img
              src={`${import.meta.env.VITE_BASE_URL}${singleProduct?.imageUrls[0]}`}
              alt={singleProduct?.title}
              className="mx-auto  object-cover rounded-md"
            />
          </figure>
          <div className="col-span-2  md:ml-4">
            <div>
              <h2 className="card-title text-3xl">{singleProduct?.title}</h2>
              <p className="text-xl font-semibold">ধরণ: {singleProduct?.categoryName}</p>
              {/* <h3 className="card-title text-xl">brand: {brand}</h3> */}
              <div className="text-xl font-semibold text-green-700 mb-4">
                মূল্য:{" "}
                {singleProduct?.categoryId == "6650aabd63490d2bca547c21" ? (
                  singleProduct?.price
                ) : (
                  <>
                    {singleProduct?.pricePackage?.map((item, index) => (
                      <li key={index}>
                        {item.name} -- {item.price} টাকা
                      </li>
                    ))}
                  </>
                )}{" "}
                
              </div>
            </div>
            <div className="my-4">
              <h3 className="text-3xl font-semibold">বৈশিষ্ট্য</h3>
              <ul>
                {singleProduct?.features.map((feature, i) => (
                  <ul key={i}>
                    {i + 1}. {feature}
                  </ul>
                ))}
              </ul>
            </div>
            {singleProduct?.demo && (
              <div className="my-4  font-semibold">
                <p>
                  #ডেমো লিংক:{" "}
                  <a className="text-blue-500" href={singleProduct?.demoLink} target="_blank">
                    {" "}
                    ক্লিক করুন{" "}
                  </a>
                </p>
                <p>#ইউজার: {singleProduct?.userName}</p>
                <p>#পাসওয়ার্ড: {singleProduct?.password}</p>
              </div>
            )}
          </div>
        </div>

        <div className="border w-full my-10  rounded-3xl">
          <div className="w-full border-b p-6 flex justify-start items-center text-xl font-bold gap-4">
            <p className="border border-green-700 py-3 px-6 rounded-full ">
              বিস্তারিত তথ্য
            </p>
            <a href={singleProduct?.video} target="_blank">
              <p className="border hover:border-red-500 py-3 px-6 rounded-full">
                ভিডিও
              </p>
            </a>
          </div>
          <div className="p-6">
            <p className="text-justify">{singleProduct?.details}</p>
          </div>
        </div>
      </div>
        <div className="flex gap-3 justify-end">
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

export default ProductViewModal;
