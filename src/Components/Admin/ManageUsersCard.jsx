import { Link } from "react-router-dom";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";

const ManageUsersCard = ({ userAll, index, refetch }) => {
  const { _id, name, email, role, image } = userAll;
  const axiosSecure = useAxiosSecure();
  const handleDeleteUser = (_id) => {
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
        axiosSecure.delete(`/users/${_id}`)
        .then((res) => {
          refetch();
          if (res.data) {
            Swal.fire({
              title: "Deleted!",
              text: "Your Application has been deleted.",
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
      <td>{name}</td>

      <td>{email}</td>
      <td>{role}</td>

      <td>
        <button
          onClick={() => handleDeleteUser(_id)}
          className="btn btn-warning btn-xs text-white"
        >
          Delete
        </button>
      </td>
      <td>
        <select className="select select-bordered w-xl max-w-xs">
          <option disabled selected>
            Select Role
          </option>
          <option value='moderator'>Moderator</option>
          <option value='moderator'>Admin</option>
        </select>
      </td>
    </tr>
  );
};

export default ManageUsersCard;
