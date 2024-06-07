
import { useState } from "react";
import { Link, useLoaderData } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Autoplay, Grid, Pagination } from "swiper/modules";
import ReviewCard from "./ReviewCard";
import Swal from "sweetalert2";

const ScholarDetails = () => {
  const scholarUniversity = useLoaderData();
  
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const {
    _id,
    universityImage,
    universityName,
    scholarshipCategory,
    country,
    applicationDeadline,
    subjectName,
    scholarshipDescription,
    stipend,
    postDate,
    serviceCharge,
    applicationFees,
  } = scholarUniversity;

  

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/reviews");
      return res.data;
    },
  });

  const filterReviews = reviews.filter((review) => review.universityId === _id);

  return (
    <>
      <div className="container mx-auto space-y-12 mt-12 mb-24">
        <div className="flex flex-col overflow-hidden rounded-md shadow-sm lg:flex-row">
          <img
            src={universityImage}
            alt=""
            className="h-80 dark:bg-gray-500 aspect-video"
          />
          <div className="flex flex-col justify-center flex-1 ps-6 dark:bg-gray-50">
            <span className="text-xs uppercase dark:text-gray-600">
              Join Here
            </span>
            <h3 className="text-3xl font-bold">{universityName}</h3>
            <p className="dark:text-gray-600">
              Scholarship category: {scholarshipCategory}
            </p>
            <p className="dark:text-gray-600">University location: {country}</p>
            <p className="dark:text-gray-600">
              Application Deadline: {applicationDeadline}
            </p>
            <p className="dark:text-gray-600">
              Scholarship Description: {scholarshipDescription}
            </p>
            <p className="dark:text-gray-600">Subject name: {subjectName}</p>
            <p className="dark:text-gray-600">Stipend: {stipend}</p>
            <p className="dark:text-gray-600">Post Date: {postDate}</p>
            <p className="dark:text-gray-600">
              Service Charge: ${serviceCharge}
            </p>
            <p className="dark:text-gray-600">
              Application Fees: ${applicationFees}
            </p>
            <Link
              to={`/payment/${_id}`}
              className="self-start btn bg-blue-600 text-white hover:bg-blue-700"
            >
              Apply Scholarship
            </Link>
          </div>
        </div>
      </div>

      <div className="">
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
            modules={[Autoplay, Grid, Pagination]}
            className="mySwiper"
          >
            {filterReviews.map((review) => (
              <SwiperSlide key={review._id}>
                <ReviewCard review={review} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </>
  );
};

export default ScholarDetails;
