import { Link } from "react-router-dom";
import "./Product.css";
import {
  MdCategory,
  MdDiscount,
} from "react-icons/md";

const SingleProduct = ({ product }) => {
  const {
    title,
    imageUrls,
    categoryName,
    _id,
    discount,
    isDiscount,
  } = product;

  return (

    <div
      className={`card bg-base-100 shadow-xl border-2 border-dashed cursor-pointer`}>
      <Link to={`/product/details/${_id}`}>
        <div
          className="bg-red-500  flex  md:h-[550px] h-[450px] rounded-2xl bg-cover"
          style={{
            backgroundImage: `url(${`${import.meta.env.VITE_BASE_URL}${
              imageUrls[0]
            }`})`,
          }}>
          {isDiscount && (
            <div className="h-full">
              <div className="gap-4 flex flex-col justify-between h-full">
                <div
                  className={`bg-red-500 text-white rounded-tl-xl rounded-br-xl px-2 py-1 font-semibold text-2xl`}>
                  <p className="flex items-center gap-1">
                    <MdDiscount></MdDiscount>
                    <span> {discount} % OFF</span>
                  </p>
                </div>
                {/* <div className='p-2 hover:cursor-pointer'>
                       <p className="font-bold text-white">Visit</p>
                   </div> */}
              </div>
            </div>
          )}
        </div>
      </Link>
      <div className="space-y-2 flex justify-between items-center gap-4 p-4">
        <h2 className="text-sm w-full font-semibold line-clamp-1">{title}</h2>
        <h2 className="text-sm flex items-center gap-1 badge-success py-1 px-2 text-white rounded-full">
          <MdCategory></MdCategory>
          {categoryName}
        </h2>
      </div>
    </div>
  );
};

export default SingleProduct;
