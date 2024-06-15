import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import HeadNotice from "../HeadNotice/HeadNotice";
import ContactSection from "../ContactSection";
import Category from "../Category";
import AllProducts from "../Products/AllProducts";
import Footer from "../Footer";

const HeroSlider = ({ data, products, categorys }) => {
  const banner = data?.banner?.filter((item) => item.status === true);
  const product = products?.filter((item) => item.status === true);
  return (
    <div className="max-w-screen-2xl mx-auto rounded-3xl md:h-[100px] h-[200px]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        modules={[Autoplay, Pagination]}
        className="mySwiper rounded-3xl">
        {banner?.map((slider, index) => (
          <SwiperSlide key={index}>
            <img
              className="w-full rounded-3xl  md:h-[500px] h-[200px]"
              src={`${import.meta.env.VITE_BASE_URL}${slider.url}`}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="md:pe-0">
        <HeadNotice notice={data?.topNews}></HeadNotice>
      </div>
      <ContactSection
        telegram={data?.telegramChannel}
        whatsapp={data?.telegramGroup}
        youtube={data?.youtube}></ContactSection>
      <Category categorys={categorys}></Category>
      <AllProducts products={product}></AllProducts>
      <Footer></Footer>
    </div>
  );
};

export default HeroSlider;
