import Swal from "sweetalert2";
import useAxiosPublic from "./../../Hooks/useAxiosPublic";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useState } from "react";
import { Rating } from "primereact/rating";
const UserApplicationCard = ({ application, index, refetch }) => {
  const axiosSecure = useAxiosSecure();
  const [adminAction, setAdminAction] = useState("");
  const [modal, setModal] = useState(false);
  const [modal2, setModal2] = useState(false);
  const [value, setValue] = useState(1);
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
    scholarshipId,
    university_name,
    status,
    university_address,
    subject_category,
    applied_degree,
    application_fees,
    service_charge,
    feedback,
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

  const handleRoleChange = async (e) => {
    const action = e.target.value;
    setAdminAction(action);
    console.log(action);

    try {
      const res = await axiosSecure.patch(`/applications/${_id}`, {
        status: action,
      });

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
    document.getElementById("my_modal_3").showModal();
  };
  const handleFeedBackForm = async (e) => {
    try {
      e.preventDefault();
      const form = e.target;
      const feedback = form.message.value;
      await axiosSecure
        .put(`/applications/${_id}`, {
          feedback: feedback,
        })
        .then((res) => {
          console.log(res.data);
          if (res.data) {
            Swal.fire({
              title: "Success!",
              text: "Feedback Send Success.",
              icon: "success",
            });
          }
        });
      refetch();
      setModal(false);
    } catch {
      console.log(error);
    }
  };
  const handleAddReview = () => {
    setModal2(true);
    document.getElementById("my_modal_4").showModal();
  };
  const handleSubmit = (e) => {
    e.preventDefault();

    const form = e.target;
    const email = user?.email;
    const reviewer_name = user?.displayName;
    const reviewer_image = user?.photoURL;
    const review_date = new Date();
    const universityId = scholarshipId;
    const applied_degree = applied_degree;
    const reviewer_rating = value;
    const scholarship_name = application.scholarship_name;
    const reviewer_comments = form.review.value;
    const reviewsCollection = {
      email,
      reviewer_name,
      reviewer_image,
      review_date,
      universityId,
      university_name,
      reviewer_rating,
      reviewer_comments,
      scholarship_name,
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
        setModal2(false)
        refetch();
      })
      .catch((err) => {
        console.error(err);
      });
  };
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
              {status ? status : "pending"}
            </button>
          )}
          {role.role === "admin" || role.role === "moderator" && (
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
          <>
            <th>
              <Link
                to={`/userDashboard/updateapplication/${_id}`}
                className="btn btn-warning btn-xs text-white"
              >
                Update
              </Link>
            </th>
            <th>
              <button
                onClick={() => handleAddReview(_id)}
                className="btn btn-warning btn-xs text-white"
              >
                Add Review
              </button>
            </th>
          </>
        )}
        {role.role === "admin" || role.role === "moderator" && (
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
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => setModal(false)}
              >
                ✕
              </button>
            </form>
            <form onSubmit={handleFeedBackForm}>
              <h3 className="font-bold text-lg mb-4">Feedback</h3>
              <div>
                <label htmlFor="message" className="text-sm font-semibold">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows="3"
                  className="w-full p-3 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full p-3 mt-4 text-sm font-bold tracking-wide uppercase rounded bg-blue-600 text-white hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </dialog>
      )}
      {modal2 && (
        <dialog id="my_modal_4" className="modal" open>
          <div className="modal-box border-2 rounded-lg p-4">
            <form method="dialog">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={() => setModal(false)}
              >
                ✕
              </button>
            </form>
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
        </dialog>
      )}
    </>
  );
};

export default UserApplicationCard;
