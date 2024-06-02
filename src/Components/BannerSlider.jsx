
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';

const BannerSlider = () => {
  return (
    <div>
      <Swiper pagination={true}  autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }} modules={[Autoplay, Pagination, Navigation]} className="mySwiper">
        <SwiperSlide>
            <img className='w-full md:h-[87vh]' src="https://i.ibb.co/1mPYm2D/isometric-design-5.png" alt="" />
        </SwiperSlide>
        <SwiperSlide>
        <img className='w-full md:h-[87vh]' src="https://i.ibb.co/bgjzDpQ/likeus-ad.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
        <img className='w-full md:h-[87vh]' src="https://i.ibb.co/yPsgH2b/replicate-prediction-sthhejq0bhrgp0cft9zrsqyeq0.png" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  );
};

export default BannerSlider;
