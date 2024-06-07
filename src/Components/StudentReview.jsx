
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Autoplay, Grid, Pagination } from "swiper/modules";
import ReviewCard from './ReviewCard';
const StudentReview = () => {
    const axiosPublic = useAxiosPublic()
    const {data: reviews= []} = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosPublic.get('/reviews')
            return res.data
        }
    })
    return (
        <div className='mt-48 mb-24 '>
            <h1 className='text-center font-bold text-4xl mb-10'>Our Student Review</h1>
            <div>
            <Swiper
            slidesPerView={2}
            grid={{
              columns: 2,
            }}
            spaceBetween={30}
            pagination={{
              clickable: true,
            }}
            autoplay={{
                delay: 2500,
                disableOnInteraction: false,
              }}
            modules={[Autoplay,Grid, Pagination]}
            className="mySwiper"
          >
            {reviews.map((review) => (
              <SwiperSlide key={review._id}>
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
            </div>
        </div>
    );
};

export default StudentReview;