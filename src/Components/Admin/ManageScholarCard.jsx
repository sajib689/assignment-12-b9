import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdDelete, MdOutlinePreview } from "react-icons/md";
import { useState } from "react";

const ManageScholarCard = ({ scholar, refetch, index }) => {
  const {
    _id,
    universityName,
    scholarshipCategory,
    subjectName,
    applicationFees,
    universityImage
  } = scholar;
  
  const [details, setDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const axiosSecure = useAxiosSecure();

  const handleDetails = async (_id) => {
    const res = await axiosSecure.get(`/university/${_id}`);
    setDetails(res.data);
    setIsModalOpen(true);
  };

  const handleDeleteScholar = (_id) => {
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
        axiosSecure.delete(`/university/${_id}`).then((res) => {
          refetch();
          if (res.data) {
            Swal.fire({
              title: "Deleted!",
              text: "Your Scholar has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <>
      <tr>
        <th>
          <label>{index + 1}</label>
        </th>
        <td>{scholarshipCategory}</td>
        <td>{universityName}</td>
        <td>{subjectName}</td>
        <td>{}</td>
        <td>${applicationFees}</td>
        <th>
          <button
            className="btn"
            onClick={() => handleDetails(_id)}
          >
            <MdOutlinePreview className="text-2xl text-green-700" />
          </button>
        </th>
        <th>
          <button
            onClick={() => handleDeleteScholar(_id)}
            className="btn btn-warning btn-xs text-white"
          >
            <MdDelete className="text-2xl text-red-500" />
          </button>
        </th>
        <th>
          <Link
            to={`/userDashboard/updateapplication/${_id}`}
            className="btn btn-warning btn-xs text-white"
          >
            Update
          </Link>
        </th>
      </tr>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="modal-box bg-white p-6 rounded shadow-lg">
            <div className="flex flex-col justify-center items-center">
              <img className="mt-5" src={details.universityImage} alt="University" />
              <h3 className="font-bold text-lg mt-4">{details.universityName}</h3>
              <p className="py-4">{details.scholarshipDescription}</p>
              <button className="btn" onClick={() => setIsModalOpen(false)}>
                Close
              </button>
            </div>
          </div>
          <div className="modal-backdrop fixed inset-0 bg-black opacity-50"></div>
        </div>
      )}
    </>
  );
};

export default ManageScholarCard;
