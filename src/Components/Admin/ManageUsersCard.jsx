import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const ManageUsersCard = ({ userAll, index, refetch }) => {
  const { _id, name, email, role, image } = userAll;
  const axiosSecure = useAxiosSecure();
  const [selectedRole, setSelectedRole] = useState(role); 

  // Handle delete user
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
        axiosSecure.delete(`/users/${_id}`).then((res) => {
          refetch();
          if (res.data) {
            Swal.fire({
              title: "Deleted!",
              text: "The user has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  // Handle role change
  const handleRoleChange = (e) => {
    const newRole = e.target.value;
    setSelectedRole(newRole); 

    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to change the role to ${newRole}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, change it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/users/${_id}/role`, { role: newRole }).then((res) => {
          refetch();
          if (res.data) {
            Swal.fire({
              title: "Updated!",
              text: `The user role has been changed to ${newRole}.`,
              icon: "success",
            });
          }
        });
      } else {
        setSelectedRole(role); 
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
        <select
          name="role"
          className="select select-bordered w-xl max-w-xs"
          value={selectedRole} 
          onChange={handleRoleChange} 
        >
          <option disabled>Select Role</option>
          <option value="moderator">Moderator</option>
          <option value="admin">Admin</option>
        </select>
      </td>
    </tr>
  );
};

export default ManageUsersCard;
