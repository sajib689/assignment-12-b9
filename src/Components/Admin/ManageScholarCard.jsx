import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdDelete, MdOutlinePreview } from "react-icons/md";

const ManageScholarCard = ({ scholar, refetch, index }) => {
  const {
    _id,
    universityName,
    scholarshipCategory,
    subjectName,
    applicationFees,
    universityImage
  } = scholar;
  console.log(scholar);
  const axiosSecure = useAxiosSecure();
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
          onClick={() => document.getElementById("my_modal_2").showModal()}
        >
          <MdOutlinePreview className="text-2xl text-green-700" />
        </button>
        <dialog id="my_modal_2" className="modal">
          <div className="modal-box flex flex-col justify-center items-center">
            <img className="mt-5" src={universityImage} alt="" />
            <h3 className="font-bold text-lg">{universityName}</h3>
            <p className="py-4">Press ESC key or click outside to close</p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
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
  );
};

export default ManageScholarCard;
