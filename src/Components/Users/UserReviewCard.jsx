import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const UserReviewCard = ({ review, index,refetch }) => {
  const axiosPublic = useAxiosPublic();
  
  const {
    _id,
    university_name,
    scholarship_name,
    reviewer_comments,
    review_date,
    applied_degree
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
 
  return (
    <tr>
      <th>
        <label>{index + 1}</label>
      </th>
      <td>{university_name}</td>
      <td>{reviewer_comments}</td>
      <td>{applied_degree}</td>
      <td>{date}</td>
      <td>
        <Link to={`/userDashboard/updatereview/${_id}`} className="btn btn-success text-white cursor-pointer">
          Update
        </Link>
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
  );
};

export default UserReviewCard;
