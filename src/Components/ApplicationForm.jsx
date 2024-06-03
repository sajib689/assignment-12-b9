import { useState } from 'react';
import useAuth from '../Hooks/useAuth';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const photo_Api = import.meta.env.VITE_IMAGE_API_KEY;
const image_host_url = `https://api.imgbb.com/1/upload?key=${photo_Api}`;

const ApplicationForm = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const [formData, setFormData] = useState({
    phoneNumber: '',
    photo: null,
    address: {
      village: '',
      district: '',
      country: '',
    },
    gender: '',
    degree: '',
    sscResult: '',
    hscResult: '',
    studyGap: '',
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'photo') {
      setFormData({ ...formData, [name]: files[0] });
    } else if (name in formData.address) {
      setFormData({
        ...formData,
        address: {
          ...formData.address,
          [name]: value,
        },
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formPhoto = new FormData();
      formPhoto.append('image', formData.photo);
      const response = await axiosPublic.post(image_host_url, formPhoto);
      const photoUrl = response.data.data.url;
      const submissionData = {
        ...formData,
        photo: photoUrl,
      };
      console.log(submissionData);
      // Submit your form data to the server here
    } catch (error) {
      console.error('Error uploading photo:', error);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-8">
      <h2 className="text-3xl font-semibold text-center mb-6">Application Form</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block mb-2 text-sm font-medium">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Photo</label>
          <input
            type="file"
            name="photo"
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Village</label>
          <input
            type="text"
            name="village"
            value={formData.address.village}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">District</label>
          <input
            type="text"
            name="district"
            value={formData.address.district}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Country</label>
          <input
            type="text"
            name="country"
            value={formData.address.country}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Gender</label>
          <select
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="" disabled>Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Applying Degree</label>
          <select
            name="degree"
            value={formData.degree}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          >
            <option value="" disabled>Select Degree</option>
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
            value={formData.sscResult}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">HSC Result</label>
          <input
            type="text"
            name="hscResult"
            value={formData.hscResult}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Study Gap</label>
          <select
            name="studyGap"
            value={formData.studyGap}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded"
          >
            <option value="" disabled>Select Study Gap</option>
            <option value="none">None</option>
            <option value="1 year">1 Year</option>
            <option value="2 years">2 Years</option>
            <option value="3 years">3 Years</option>
            <option value="4+ years">4+ Years</option>
          </select>
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">University Name</label>
          <input
            type="text"
            name="universityName"
            value={user.universityName} 
            className="w-full p-2 border border-gray-300 rounded bg-gray-200 cursor-not-allowed"
            readOnly
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Scholarship Category</label>
          <input
            type="text"
            name="scholarshipCategory"
            value={user.scholarshipCategory} 
            className="w-full p-2 border border-gray-300 rounded bg-gray-200 cursor-not-allowed"
            readOnly
          />
        </div>
        <div>
          <label className="block mb-2 text-sm font-medium">Subject Category</label>
          <input
            type="text"
            name="subjectCategory"
            value={user.subjectCategory} 
            className="w-full p-2 border border-gray-300 rounded bg-gray-200 cursor-not-allowed"
            readOnly
          />
        </div>
        <button
          type="submit"
          className="w-full p-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
           Apply
        </button>
      </form>
    </div>
  );
};

export default ApplicationForm;
