import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";


const ManageReviewCard = ({review,refetch}) => {
    const {_id,university_name,reviewer_image,reviewer_name,reviewer_comments,review_date,reviewer_rating} = review
    console.log(review)
    const date = new Date(review_date).toLocaleDateString()
    const axiosPublic = useAxiosPublic()
    const handleDelete = _id => {
      Swal.fire({
        title: "Are you sure?",
        text: "You won't be able to revert this!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!"
      }).then((result) => {
        if (result.isConfirmed) {
         axiosPublic.delete(`/reviews/${_id}`)
         .then(res => {
          if(res.data) {
            Swal.fire({
              title: "Deleted!",
              text: "Your review has been deleted.",
              icon: "success"
            });
          }
          refetch()
         })
        }
      });
    }
    return (
        <div className="w-full max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="flex justify-between items-center -mt-16 md:justify-between">
         
          <div>
          <img
            className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full dark:border-blue-400"
            alt="Testimonial avatar"
            src={reviewer_image}
          />
          </div>
          <div>
          <h1 className='text-2xl font-bold'>{reviewer_name}</h1>
          </div>
        </div>
        <div className="mt-6">
        <a href="#" className="mt-6 text-lg font-medium text-blue-600 dark:text-blue-300" tabIndex="0" role="link">
           {university_name}
          </a>
        <h2 className="mt-2 text-xl font-semibold text-gray-800 dark:text-white md:mt-0">Design Tools</h2>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
          {date}
        </p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
         Rating Point: {reviewer_rating} star
        </p>
        <p className="mt-2 text-sm text-gray-600 dark:text-gray-200">
         Comments: {reviewer_comments} star
        </p>
        </div>
        <div className="flex justify-start mt-4">
          <button onClick={() => handleDelete(_id)} className="btn btn-warning text-white">Delete</button>
        </div>
      </div>
    );
};

export default ManageReviewCard;