import { Rating } from "primereact/rating";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../Hooks/useAuth";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/grid";
import "swiper/css/pagination";
import { Grid, Pagination } from "swiper/modules";
import ReviewCard from "./ReviewCard";
import Swal from "sweetalert2";

const ScholarDetails = () => {
  const scholarUniversity = useLoaderData();
  const [value, setValue] = useState(1);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = user?.email;
    const reviewer_name = user?.displayName;
    const reviewer_image = user?.photoURL;
    const review_date = new Date();
    const universityId = _id;
    const reviewer_rating = value;
    const reviewer_comments = form.review.value;
    const reviewsCollection = {
        email,
      reviewer_name,
      reviewer_image,
      review_date,
      universityId,
      universityName,
      reviewer_rating,
      reviewer_comments,
    };

    axiosPublic
      .post("/reviews", reviewsCollection)
      .then((res) => {
        form.reset();
        if (res.data) {
          Swal.fire({
            position: "top-center",
            icon: "success",
            title: "Review Add Success",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        refetch();
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const { data: reviews = [], refetch } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get("/reviews");
      return res.data;
    },
  });

  const filterReviews = reviews.filter((review) => review.universityId === _id);
  console.log(filterReviews);

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
            <button
              type="button"
              className="self-start btn bg-blue-600 text-white hover:bg-blue-700"
            >
              Apply Scholarship
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols md:grid-cols-2 lg:grid-cols-2 gap-6">
        <div className="flex flex-col w-[410px] md:w-full lg:w-full md:p-8  shadow-sm rounded-xl lg:p-12 dark:bg-gray-50 dark:text-gray-800">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-center w-full"
          >
            <h2 className="text-3xl font-semibold text-center">
              Your opinion matters!
            </h2>
            <div className="flex flex-col items-center py-6 space-y-3">
              <span className="text-center">How was your experience?</span>
              <div className="flex space-x-3">
                <Rating
                  value={value}
                  onChange={(e) => setValue(e.value)}
                  cancel={false}
                  required
                />
              </div>
            </div>
            <div className="flex flex-col w-full">
              <textarea
              required
                name="review"
                rows="3"
                placeholder="Message..."
                className="p-4 border rounded-md resize-none dark:text-gray-800 dark:bg-gray-50"
              ></textarea>
              <button
                type="submit"
                className="py-4 bg-blue-600 text-white my-8 font-semibold rounded-md dark:text-gray-50 dark:bg-blue-600"
              >
                Leave feedback
              </button>
            </div>
          </form>
        </div>
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
            modules={[Grid, Pagination]}
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
