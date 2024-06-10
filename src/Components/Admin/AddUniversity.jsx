import { useState } from "react";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";
import useAuth from "../../Hooks/useAuth";
import { useNavigate } from "react-router-dom";

const image_api_key = import.meta.env.VITE_IMAGE_API_KEY;
const image_url = `https://api.imgbb.com/1/upload?key=${image_api_key}`;

const AddUniversity = () => {
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(false);
  const {user} = useAuth()
  const navigate = useNavigate()
  const handleAddScholar = async (e) => {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData();
    formData.append("image", form.universityImage.files[0]);
    
    try {
      setLoading(true);
      const res = await axios.post(image_url, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      const universityImageURL = res.data.data.display_url;
      const universityName = form.universityName.value;
      const scholarshipCategory = form.scholarshipCategory.value;
      const country = form.country.value;
      const city = form.city.value;
      const applicationDeadline = form.applicationDeadline.value;
      const subjectName = form.subjectName.value;
      const scholarshipName = form.scholarshipName.value;
      const universityWorldRank = form.universityWorldRank.value;
      const degree = form.degree.value;
      const tuitionFees = form.tuitionFees.value;
      const serviceCharge = form.serviceCharge.value;
      const applicationFees = form.applicationFees.value;
      const postDate = form.postDate.value;
      const postedUserEmail = form.postedUserEmail.value;

      const application = {
        universityName,
        universityImage: universityImageURL,
        scholarshipCategory,
        country,
        city,
        applicationDeadline,
        subjectName,
        scholarshipName,
        universityWorldRank,
        degree,
        tuitionFees,
        serviceCharge,
        applicationFees,
        postDate,
        postedUserEmail,
      };

      await axiosSecure.post("/university", application);
      Swal.fire({
        position: "top-center",
        icon: "success",
        title: "Your scholar has been saved",
        showConfirmButton: false,
        timer: 1500,
      });
      form.reset();
      navigate('/userDashboard/managescholar')
    } catch (error) {
      console.error("Error uploading image or submitting form data", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Scholarship Submission Form
      </h1>
      <form onSubmit={handleAddScholar}>
        <div className="mb-4">
          <label htmlFor="scholarshipName" className="block text-gray-700">
            Scholarship Name:
          </label>
          <input
            type="text"
            id="scholarshipName"
            name="scholarshipName"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="universityName" className="block text-gray-700">
            University Name:
          </label>
          <input
            type="text"
            id="universityName"
            name="universityName"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="universityImage" className="block text-gray-700">
            University Image/Logo:
          </label>
          <input
            type="file"
            id="universityImage"
            name="universityImage"
            accept="image/*"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="country" className="block text-gray-700">
            University Country:
          </label>
          <input
            type="text"
            id="country"
            name="country"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="city" className="block text-gray-700">
            University City:
          </label>
          <input
            type="text"
            id="city"
            name="city"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="universityWorldRank" className="block text-gray-700">
            University World Rank:
          </label>
          <input
            type="number"
            id="universityWorldRank"
            name="universityWorldRank"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="subjectName" className="block text-gray-700">
            Subject Category:
          </label>
          <select
            id="subjectName"
            name="subjectName"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          >
            <option value="">Select Subject Category</option>
            <option value="Agriculture">Agriculture</option>
            <option value="Engineering">Engineering</option>
            <option value="Doctor">Doctor</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="scholarshipCategory" className="block text-gray-700">
            Scholarship Category:
          </label>
          <select
            id="scholarshipCategory"
            name="scholarshipCategory"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          >
            <option value="">Select Scholarship Category</option>
            <option value="Full fund">Full fund</option>
            <option value="Partial">Partial</option>
            <option value="Self-fund">Self-fund</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="degree" className="block text-gray-700">
            Degree:
          </label>
          <select
            id="degree"
            name="degree"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          >
            <option value="">Select Degree</option>
            <option value="Diploma">Diploma</option>
            <option value="Bachelor">Bachelor</option>
            <option value="Masters">Masters</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="tuitionFees" className="block text-gray-700">
            Tuition Fees (optional):
          </label>
          <input
            type="number"
            id="tuitionFees"
            name="tuitionFees"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="applicationFees" className="block text-gray-700">
            Application Fees:
          </label>
          <input
            type="number"
            id="applicationFees"
            name="applicationFees"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="serviceCharge" className="block text-gray-700">
            Service Charge:
          </label>
          <input
            type="number"
            id="serviceCharge"
            name="serviceCharge"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="applicationDeadline" className="block text-gray-700">
            Application Deadline:
          </label>
          <input
            type="date"
            id="applicationDeadline"
            name="applicationDeadline"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="postDate" className="block text-gray-700">
            Scholarship Post Date:
          </label>
          <input
            type="date"
            id="postDate"
            name="postDate"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="postedUserEmail" className="block text-gray-700">
            Posted User Email:
          </label>
          <input
            type="email"
            id="postedUserEmail"
            value={user?.email}
            name="postedUserEmail"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          />
        </div>

        <div className="text-center ">
          <input
            type="submit"
            value={loading ? "Submitting..." : "Submit"}
            className="bg-indigo-500 w-full hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
            disabled={loading}
          />
        </div>
      </form>
    </div>
  );
};

export default AddUniversity;
