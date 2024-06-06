import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import mainSlider from "../../../data/mainSlider";
import HeadNotice from "../HeadNotice/HeadNotice";
import ContactSection from "../ContactSection";
import Category from "../Category";
import AllProducts from "../Products/AllProducts";
import Footer from "../Footer";

const HeroSlider = () => {
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
        {mainSlider?.map((slider, index) => (
          <SwiperSlide key={index}>
            <img
              className="w-full rounded-3xl  md:h-[500px] h-[200px]"
              src={slider?.bg}
              alt=""
            />
          </SwiperSlide>
        ))}
      </Swiper>
      <HeadNotice></HeadNotice>
      <ContactSection></ContactSection>
      <Category></Category>
      <AllProducts></AllProducts>
      <Footer></Footer>
    </div>
  );
};

export default HeroSlider;
