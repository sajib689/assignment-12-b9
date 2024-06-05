import { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";

const photo_Api = import.meta.env.VITE_IMAGE_API_KEY;
const image_host_url = `https://api.imgbb.com/1/upload?key=${photo_Api}`;

const UpdateApplication = () => {
  const { user } = useAuth();
  const [users, setUsers] = useState([]);
  const axiosPublic = useAxiosPublic();
  const application = useLoaderData();
  const navigate = useNavigate();
  const {
    _id,
    phoneNumber,
    photo,
    address,
    gender,
    degree,
    sscResult,
    hscResult,
    studyGap,
    university_name,
    subject_category,
    applied_degree,
  } = application;

  // State to manage the photo
  const [currentPhoto, setCurrentPhoto] = useState(photo || photo);
  const [selectedFile, setSelectedFile] = useState(null);

  // get users data and store data in state
  useEffect(() => {
    axiosPublic.get("/users").then((res) => {
      setUsers(res.data);
    });
  }, [axiosPublic]);

  // Handle photo upload
  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setCurrentPhoto(reader.result);
    };
    reader.readAsDataURL(file);
  };

  // submit the new update data to the server
  const handleUpdateApplication = async (e) => {
    e.preventDefault();
    const form = e.target;

    const formData = new FormData(form);
    let photoUrl = currentPhoto;

    if (selectedFile) {
      const formPhoto = new FormData();
      formPhoto.append("image", selectedFile);

      try {
        const response = await axiosPublic.post(image_host_url, formPhoto);
        photoUrl = response.data.data.url;
      } catch (error) {
        console.error("Error uploading photo:", error);
        return; 
      }
    }

    const applicationData = {
      phoneNumber: formData.get("phoneNumber"),
      photo: photoUrl,
      address: {
        village: formData.get("village"),
        district: formData.get("district"),
        country: formData.get("country"),
      },
      gender: formData.get("gender"),
      degree: formData.get("degree"),
      sscResult: formData.get("sscResult"),
      hscResult: formData.get("hscResult"),
      studyGap: formData.get("studyGap"),
    };

    try {
      const response = await axiosPublic.put(`/applications/${_id}`, applicationData);
      if (response.data) {
        Swal.fire({
          position: "top-center",
          icon: "success",
          title: "Your Application Updated",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate("/userDashboard/userApplication"); 
      }
    } catch (error) {
      console.error("Error updating application:", error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-3xl font-semibold text-center mb-6">
        Update Your Application Form
      </h2>
      <form onSubmit={handleUpdateApplication} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            defaultValue={phoneNumber}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Photo</label>
          <input
            type="file"
            name="photo"
            className="w-full p-2 border border-gray-300 rounded"
            onChange={handlePhotoChange}
          />
          <img
            src={currentPhoto}
            alt="Application Photo"
            className="mt-2 w-24 h-24 object-cover rounded"
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Village</label>
          <input
            type="text"
            name="village"
            defaultValue={address.village}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">District</label>
          <input
            type="text"
            name="district"
            defaultValue={address.district}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Country</label>
          <input
            type="text"
            name="country"
            defaultValue={address.country}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Gender</label>
          <select
            name="gender"
            defaultValue={gender}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="" disabled>
              Select Gender
            </option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">
            Applying Degree
          </label>
          <select
            name="degree"
            defaultValue={degree}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="" disabled>
              Select Degree
            </option>
            <option value="diploma">Diploma</option>
            <option value="bachelor">Bachelor</option>
            <option value="masters">Masters</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">SSC Result</label>
          <input
            type="text"
            name="sscResult"
            defaultValue={sscResult}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">HSC Result</label>
          <input
            type="text"
            name="hscResult"
            defaultValue={hscResult}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Study Gap</label>
          <select
            name="studyGap"
            defaultValue={studyGap}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>
              Select Study Gap
            </option>
            <option value="none">None</option>
            <option value="1 year">1 Year</option>
            <option value="2 years">2 Years</option>
            <option value="3 years">3 Years</option>
            <option value="4+ years">4+ Years</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">
            University Name
          </label>
          <input
            type="text"
            name="universityName"
            defaultValue={university_name}
            className="w-full p-2 border border-gray-300 rounded bg-gray-200 cursor-not-allowed"
            readOnly
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">
            Scholarship Category
          </label>
          <input
            type="text"
            name="scholarshipCategory"
            defaultValue={applied_degree}
            className="w-full p-2 border border-gray-300 rounded bg-gray-200 cursor-not-allowed"
            readOnly
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">
            Subject Category
          </label>
          <input
            type="text"
            name="subjectCategory"
            defaultValue={subject_category}
            className="w-full p-2 border border-gray-300 rounded bg-gray-200 cursor-not-allowed"
            readOnly
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateApplication;
