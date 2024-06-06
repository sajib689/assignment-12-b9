
import useAxiosSecure from '../../Hooks/useAxiosSecure';

const image_api_key = import.meta.env.VITE_IMAGE_API_KEY;
const image_url = `https://api.imgbb.com/1/upload?key=${image_api_key}`;

const AddUniversity = () => {
  const axiosSecure = useAxiosSecure();

  const handleAddScholar = async (e) => {
    e.preventDefault();
    const form = e.target;
    const universityImage = form.universityImage.files[0];
    
    if (!universityImage) {
      console.error("University image file is missing");
      return;
    }

    const formData = new FormData();
    formData.append('image', universityImage);

    try {
      const res = await axiosSecure.post(image_url, formData);
      const image = res.data.data.display_url;

      const universityName = form.universityName.value;
      const scholarshipCategory = form.scholarshipCategory.value;
      const country = form.country.value;
      const city = form.city.value;
      const applicationDeadline = form.applicationDeadline.value;
      const subjectName = form.subjectName.value;
      const scholarshipDescription = form.scholarshipDescription.value;
      const stipend = form.stipend.value;
      const postDate = form.postDate.value;
      const serviceCharge = form.serviceCharge.value;
      const applicationFees = form.applicationFees.value;

      const application = {
        universityName,
        image,
        scholarshipCategory,
        country,
        city,
        applicationDeadline,
        subjectName,
        scholarshipDescription,
        stipend,
        postDate,
        serviceCharge,
        applicationFees,
      };

      console.log(application);
    } catch (error) {
      console.error("Error uploading image or submitting form data", error);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white shadow-md rounded-md mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">
        Scholarship Submission Form
      </h1>
      <form onSubmit={handleAddScholar}>
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
            University Image:
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
          <label htmlFor="scholarshipCategory" className="block text-gray-700">
            Scholarship Category:
          </label>
          <input
            type="text"
            id="scholarshipCategory"
            name="scholarshipCategory"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="country" className="block text-gray-700">
            Country:
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
            City:
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
          <label htmlFor="subjectName" className="block text-gray-700">
            Subject Name:
          </label>
          <input
            type="text"
            id="subjectName"
            name="subjectName"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="scholarshipDescription" className="block text-gray-700">
            Scholarship Description:
          </label>
          <textarea
            id="scholarshipDescription"
            name="scholarshipDescription"
            rows="4"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          ></textarea>
        </div>

        <div className="mb-4">
          <label htmlFor="stipend" className="block text-gray-700">
            Stipend:
          </label>
          <input
            type="text"
            id="stipend"
            name="stipend"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="postDate" className="block text-gray-700">
            Post Date:
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
          <label htmlFor="serviceCharge" className="block text-gray-700">
            Service Charge:
          </label>
          <input
            type="text"
            id="serviceCharge"
            name="serviceCharge"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="applicationFees" className="block text-gray-700">
            Application Fees:
          </label>
          <input
            type="text"
            id="applicationFees"
            name="applicationFees"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
            required
          />
        </div>

        <div className="text-center">
          <input
            type="submit"
            value="Submit"
            className="bg-indigo-500 hover:bg-indigo-700 text-white font-bold py-2 px-4 rounded"
          />
        </div>
      </form>
    </div>
  );
};

export default AddUniversity;
