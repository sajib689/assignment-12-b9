import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Rating } from "primereact/rating";

const UserReviewCard = ({ review, index,refetch }) => {
  const axiosPublic = useAxiosPublic();
  const [modal,setModal] = useState(false)
  const {
    _id,
    university_name,
    scholarship_name,
    reviewer_comments,
    review_date,
    applied_degree,
    reviewer_rating
  } = review;
  
  const date = new Date(review_date).toLocaleDateString();
  const handleDeleteReview = (_id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/reviews/${_id}`)
        .then((res) => {
            refetch()
          if (res.data) {
            Swal.fire({
              title: "Deleted!",
              text: "Your review has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };
 const handleUpdateReview = _id => {
    setModal(true)
    document.getElementById('my_modal_3').showModal()
 }
 const [value, setValue] = useState(review?.reviewer_rating)
    
 const navigate = useNavigate()
 const handleUpdateReview2 = e => {
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
         setModal(false)
         refetch()
     })
 }
  return (
    <>
    <tr>
      <th>
        <label>{index + 1}</label>
      </th>
      <td>{university_name}</td>
      <td>{reviewer_comments}</td>
      <td>{applied_degree}</td>
      <td>{date}</td>
      <td>
        <button onClick={() => handleUpdateReview(_id)} className="btn btn-success text-white cursor-pointer">
          Edit
        </button>
      </td>
      <td>
        <button
          onClick={() => handleDeleteReview(_id)}
          className="btn btn-warning text-white cursor-pointer"
        >
          Delete
        </button>
      </td>
    </tr>
    {
      modal &&
     <>
       
<dialog id="my_modal_3" className="modal">
  <div className="modal-box">
  <div className="flex flex-col justify-center items-center w-[450px] mx-auto md:w-[450px] lg:w-[450px] md:p-8  shadow-sm rounded-xl lg:p-12 dark:bg-gray-50 dark:text-gray-800">
        <form
          onSubmit={handleUpdateReview2}
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
  </div>
</dialog>
     </>
    }
    </>
  );
};

export default UserReviewCard;
