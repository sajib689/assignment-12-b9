import Swal from "sweetalert2";
import useAxiosPublic from "./../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const UserApplicationCard = ({ application, index, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { data: role = [] } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user?.email}`);
      return res.data;
    },
  });
  const {
    _id,
    university_name,
    status,
    university_address,
    subject_category,
    applied_degree,
    application_fees,
    service_charge,
  } = application;
  const axiosPublic = useAxiosPublic();
  const handleDeleteApplication = (_id) => {
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
        axiosPublic.delete(`/applications/${_id}`).then((res) => {
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
  const handleUpdateStatus = (_id) => {
    axiosSecure
      .patch(`/applications/${_id}`, {
        status: "approved",
      })
      .then((res) => {
        console.log(res.data);
      });
  };
  return (
    <tr>
      <th>
        <label>{index + 1}</label>
      </th>
      <td>{university_name}</td>

      <td>{university_address}</td>
      <td>Good Application</td>
      <td>{subject_category}</td>
      <td>{applied_degree}</td>
      <td>${application_fees}</td>
      <td>${service_charge}</td>
      <td>
        {role.role === "user" && (
          <button className="badge badge-info badge-sm text-white">
            {status}
          </button>
        )}
        {role.role === "admin" && (
          <button
            onClick={() => handleUpdateStatus(_id)}
            className="badge badge-info badge-sm text-white"
          >
            {status}
          </button>
        )}
      </td>
      <th>
        <button
          onClick={() => handleDeleteApplication(_id)}
          className="btn btn-warning btn-xs text-white"
        >
          Delete
        </button>
      </th>
      {role.role === "user" && (
        <th>
          <Link
            to={`/userDashboard/updateapplication/${_id}`}
            className="btn btn-warning btn-xs text-white"
          >
            Update
          </Link>
        </th>
      )}
    </tr>
  );
};

export default UserApplicationCard;
