import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { MdDelete, MdOutlinePreview } from "react-icons/md";
import { useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { ImCross } from "react-icons/im";

const image_api = import.meta.env.VITE_IMAGE_API_KEY;
const image_hosting_url = `https://api.imgbb.com/1/upload?key=${image_api}`;

const ManageScholarCard = ({ scholar, refetch, index }) => {
  const { _id, universityName, scholarshipCategory, subjectName, applicationFees } = scholar;

  const [details, setDetails] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpen2, setIsModalOpen2] = useState(false);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const axiosSecure = useAxiosSecure();

  const handleDetails = async (_id) => {
    const res = await axiosSecure.get(`/university/${_id}`);
    setDetails(res.data);
    setIsModalOpen(true);
  };

  const handleUpdate = async (_id) => {
    const res = await axiosSecure.get(`/university/${_id}`);
    setDetails(res.data);
    setIsModalOpen2(true);
  };

  const handleChangeImage = (e) => {
    setImage(e.target.files[0]);
  };

  const handleUpdateScholar = async (e) => {
    e.preventDefault();
    if (!image) return;

    setLoading(true);

    const form = e.target;
    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await axiosSecure.post(image_hosting_url, formData);
      const imageUrl = res.data.data.url;

      const scholarshipName = form.scholarshipName.value;
      const universityName = form.universityName.value;
      const universityImage = imageUrl;
      const country = form.country.value;
      const city = form.city.value;
      const universityWorldRank = form.universityWorldRank.value;
      const subjectName = form.subjectName.value;
      const scholarshipCategory = form.scholarshipCategory.value;
      const degree = form.degree.value;
      const tuitionFees = form.tuitionFees.value;
      const applicationFees = form.applicationFees.value;
      const serviceCharge = form.serviceCharge.value;
      const applicationDeadline = form.applicationDeadline.value;
      const postDate = form.postDate.value;

      const update = {
        scholarshipName,
        universityName,
        universityImage,
        country,
        city,
        universityWorldRank,
        subjectName,
        scholarshipCategory,
        degree,
        tuitionFees,
        applicationFees,
        serviceCharge,
        applicationDeadline,
        postDate,
      };

      await axiosSecure.put(`/university/${_id}`, update);
      Swal.fire({
        title: "Success!",
        text: "Scholarship updated successfully.",
        icon: "success",
      });
      refetch();
      setIsModalOpen2(false);
    } catch (error) {
      console.error('Error updating scholarship:', error);
      Swal.fire({
        title: "Error!",
        text: "Failed to update scholarship.",
        icon: "error",
      });
    } finally {
      setLoading(false);
    }
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
        <td>${applicationFees}</td>
        <th>
          <button className="btn" onClick={() => handleDetails(_id)}>
            <MdOutlinePreview className="text-2xl text-green-700" />
          </button>
        </th>
        <th>
          <button onClick={() => handleDeleteScholar(_id)} className="btn btn-xs w-10 h-10 text-white rounded-full">
            <MdDelete className="text-2xl text-red-500" />
          </button>
        </th>
        <th>
          <button onClick={() => handleUpdate(_id)} className="text-white">
            <FaRegEdit className="text-2xl text-green-700" />
          </button>
        </th>
      </tr>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="modal-box bg-white p-6 rounded shadow-lg">
            <div className="flex flex-col justify-center items-center">
              <img className="mt-5" src={details.universityImage} alt="University" />
              <h3 className="font-bold text-lg mt-4">{details.universityName}</h3>
              <p className="py-4">{details.scholarshipDescription}</p>
              <button className="btn" onClick={() => setIsModalOpen(false)}>Close</button>
            </div>
          </div>
          <div className="modal-backdrop fixed inset-0 bg-black opacity-50"></div>
        </div>
      )}

      {isModalOpen2 && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="modal-box bg-white p-6 rounded shadow-lg">
            <div className="flex justify-end items-end">
              <button className="btn" onClick={() => setIsModalOpen2(false)}>
                <ImCross />
              </button>
            </div>
            <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
              <h1 className="text-2xl font-bold mb-6 text-center">Update Scholarship</h1>
              <form onSubmit={handleUpdateScholar}>
                <div className="mb-4">
                  <label htmlFor="scholarshipName" className="block text-gray-700">Scholarship Name:</label>
                  <input type="text" id="scholarshipName" defaultValue={details.scholarshipName} name="scholarshipName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" required />
                </div>

                <div className="mb-4">
                  <label htmlFor="universityName" className="block text-gray-700">University Name:</label>
                  <input type="text" id="universityName" defaultValue={details.universityName} name="universityName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" required />
                </div>

                <div className="mb-4">
                  <label htmlFor="universityImage" className="block text-gray-700">University Image/Logo:</label>
                  <input type="file" id="universityImage" name="universityImage" onChange={handleChangeImage} accept="image/*" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" />
                </div>

                <div className="mb-4">
                  <label htmlFor="country" className="block text-gray-700">University Country:</label>
                  <input type="text" id="country" defaultValue={details.country} name="country" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" required />
                </div>

                <div className="mb-4">
                  <label htmlFor="city" className="block text-gray-700">University City:</label>
                  <input type="text" id="city" defaultValue={details.city} name="city" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" required />
                </div>

                <div className="mb-4">
                  <label htmlFor="universityWorldRank" className="block text-gray-700">University World Rank:</label>
                  <input type="number" id="universityWorldRank" defaultValue={details.universityWorldRank} name="universityWorldRank" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" required />
                </div>

                <div className="mb-4">
                  <label htmlFor="subjectName" className="block text-gray-700">Subject Category:</label>
                  <select id="subjectName" defaultValue={details.subjectName} name="subjectName" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" required>
                    <option value="">Select Subject Category</option>
                    <option value="Agriculture">Agriculture</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Doctor">Doctor</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="scholarshipCategory" className="block text-gray-700">Scholarship Category:</label>
                  <select id="scholarshipCategory" defaultValue={details.scholarshipCategory} name="scholarshipCategory" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" required>
                    <option value="">Select Scholarship Category</option>
                    <option value="Full fund">Full fund</option>
                    <option value="Partial">Partial</option>
                    <option value="Self-fund">Self-fund</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="degree" className="block text-gray-700">Degree:</label>
                  <select id="degree" defaultValue={details.degree} name="degree" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" required>
                    <option value="">Select Degree</option>
                    <option value="Diploma">Diploma</option>
                    <option value="Bachelor">Bachelor</option>
                    <option value="Masters">Masters</option>
                  </select>
                </div>

                <div className="mb-4">
                  <label htmlFor="tuitionFees" className="block text-gray-700">Tuition Fees (optional):</label>
                  <input type="number" id="tuitionFees" defaultValue={details.tuitionFees} name="tuitionFees" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" />
                </div>

                <div className="mb-4">
                  <label htmlFor="applicationFees" className="block text-gray-700">Application Fees:</label>
                  <input type="number" id="applicationFees" defaultValue={details.applicationFees} name="applicationFees" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" required />
                </div>

                <div className="mb-4">
                  <label htmlFor="serviceCharge" className="block text-gray-700">Service Charge:</label>
                  <input type="number" id="serviceCharge" defaultValue={details?.serviceCharge} name="serviceCharge" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" required />
                </div>

                <div className="mb-4">
                  <label htmlFor="applicationDeadline" className="block text-gray-700">Application Deadline:</label>
                  <input type="date" id="applicationDeadline" defaultValue={details?.applicationDeadline} name="applicationDeadline" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" required />
                </div>

                <div className="mb-4">
                  <label htmlFor="postDate" className="block text-gray-700">Scholarship Post Date:</label>
                  <input type="date" id="postDate" defaultValue={details?.postDate} name="postDate" className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300" required />
                </div>

                <div className="text-center ">
                  <input type="submit" value={loading ? "Submitting..." : "Submit"} className="bg-indigo-500 w-full hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded" disabled={loading} />
                </div>
              </form>
            </div>
          </div>
          <div className="modal-backdrop fixed inset-0 bg-black opacity-50"></div>
        </div>
      )}
    </>
  );
};

export default ManageScholarCard;
