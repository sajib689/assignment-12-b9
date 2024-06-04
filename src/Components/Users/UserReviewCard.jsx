import Swal from "sweetalert2";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";

const UserReviewCard = ({ review, index,refetch }) => {
  const axiosPublic = useAxiosPublic();
  const {
    _id,
    universityName,
    scholarship_name,
    reviewer_comments,
    review_date,
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
      <td>{universityName}</td>

      <td>{scholarship_name}</td>

      <td>{reviewer_comments}</td>
      <td>{date}</td>

      <th>
        <Link to={`/userDashboard/updatereview/${_id}`} className="btn btn-success text-white cursor-pointer">
          Update
        </Link>
      </th>
      <th>
        <button
          onClick={() => handleDeleteReview(_id)}
          className="btn btn-warning text-white cursor-pointer"
        >
          Delete
        </button>
      </th>
    </tr>
  );
};

export default UserReviewCard;
