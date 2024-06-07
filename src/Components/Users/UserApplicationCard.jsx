import Swal from "sweetalert2";
import useAxiosPublic from "./../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import { async } from '@firebase/util';

const UserApplicationCard = ({ application, index, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [adminAction, setAdminAction] = useState("");
  const [modal, setModal] = useState(false);
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
    feedback
  } = application;
  console.log(feedback)
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

  const handleRoleChange = async (e) => {
    const action = e.target.value;
    setAdminAction(action);
    console.log(action);

    try {
      const res = await axiosSecure.patch(`/applications/${_id}`, {
        status: action,
      });
      console.log(res.data);
      refetch();
      Swal.fire({
        title: "Success!",
        text: "Status updated successfully.",
        icon: "success",
      });
    } catch (error) {
      console.error("Error updating status:", error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update status.",
        icon: "error",
      });
    }
  };

  const handleFeddBack = async (_id) => {
    setModal(true);
    document.getElementById('my_modal_3').showModal();
   
  };
  const handleFeedBackForm = async (e) => {
    try {
      e.preventDefault();
      const form = e.target
      const feedback = form.message.value
      await axiosSecure.put(`/applications/${_id}`,{
        feedback: feedback
      })
      .then(res => {
        console.log(res.data)
        if(res.data) {
          Swal.fire({
            title: "Success!",
            text: "Feedback Send Success.",
            icon: "success",
          });
        }
      })
      refetch();
      setModal(false);
    } catch{
      console.log(error);
    }
  }
  return (
    <>
      <tr>
        <th>
          <label>{index + 1}</label>
        </th>
        <td>{university_name}</td>
        <td>{university_address}</td>
        <td>{feedback}</td>
        <td>{subject_category}</td>
        <td>{applied_degree}</td>
        <td>${application_fees}</td>
        <td>${service_charge}</td>
        <td>
          {role.role === "user" && (
            <button className="badge badge-info badge-sm text-white">
              {status ? status : 'pending'}
            </button>
          )}
          {role.role === "admin" && (
            <select
              name="role"
              className="select select-bordered w-xl max-w-xs"
              defaultValue={status}
              value={adminAction}
              onChange={handleRoleChange}
            >
              <option disabled>Select</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="completed">Completed</option>
              <option value="cancel">Cancel</option>
            </select>
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
        {role.role === "admin" && (
          <th>
            <button
              onClick={() => handleFeddBack(_id)}
              className="btn btn-success btn-xs text-white"
            >
              Feedback
            </button>
          </th>
        )}
      </tr>
      {modal && (
        <dialog id="my_modal_3" className="modal" open>
          <div className="modal-box border-2 rounded-lg p-4">
            <form method="dialog">
              <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" onClick={() => setModal(false)}>
                ✕
              </button>
            </form>
            <form onSubmit={handleFeedBackForm}>
            <h3 className="font-bold text-lg mb-4">Feedback</h3>
            <div>
              <label htmlFor="message" className="text-sm font-semibold">Message</label>
              <textarea id="message" name="message" rows="3" className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"></textarea>
            </div>
            <button type="submit" className="w-full p-3 mt-4 text-sm font-bold tracking-wide uppercase rounded bg-blue-600 text-white hover:bg-blue-700">
              Send Message
            </button>
            </form>
          </div>
        </dialog>
      )}
    </>
  );
};

export default UserApplicationCard;
