import { Rating } from "primereact/rating";
import { useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Swal from "sweetalert2";


const UpdateReview = () => {
    const review = useLoaderData()
    const [value, setValue] = useState(review?.reviewer_rating)
    const {_id,reviewer_comments} = review
    const axiosPublic = useAxiosPublic()
    const navigate = useNavigate()
    const handleUpdateReview = e => {
        e.preventDefault()
        const form = e.target
        const reviewer_comments = form.review.value
        const reviewer_rating = value
        const data = {
            reviewer_comments,
            reviewer_rating
        }
        axiosPublic.put(`/reviews/${review?._id}`,data)
        .then(res => {
            
            if (res.data) {
                Swal.fire({
                    position: "top-center",
                    icon: "success",
                    title: "Your review updated success",
                    showConfirmButton: false,
                    timer: 1500
                  });
              }
            navigate('/userDashboard/userReview')
        })
    }
    return (
        <div className="flex flex-col justify-center items-center w-[410px] mx-auto md:w-[750px] lg:w-[750px] md:p-8  shadow-sm rounded-xl lg:p-12 dark:bg-gray-50 dark:text-gray-800">
        <form
          onSubmit={handleUpdateReview}
          className="flex flex-col items-center justify-center w-full"
        >
          <h2 className="text-3xl font-semibold text-center">
          Update Your opinion matters!
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
            defaultValue={reviewer_comments}
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
              Update feedback
            </button>
          </div>
        </form>
      </div>
    );
};

export default UpdateReview;