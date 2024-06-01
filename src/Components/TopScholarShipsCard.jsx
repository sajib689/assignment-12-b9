import { Rating } from "primereact/rating";
import { Link } from "react-router-dom";

const TopScholarShipsCard = ({ university }) => {
  const { _id, universityName, universityImage, applicationFees, rating } =
    university;

  return (
    <div className="flex flex-col items-center justify-center w-full max-w-sm mx-auto">
      <div
        className="w-full h-64 bg-gray-300 bg-center bg-cover rounded-lg shadow-md"
        style={{ backgroundImage: `url(${universityImage})` }}
      ></div>

      <div className="w-56 -mt-10 overflow-hidden bg-white rounded-lg shadow-lg md:w-64 dark:bg-gray-800">
        <h3 className="py-2 font-bold tracking-wide text-center text-gray-800 uppercase dark:text-white">
          {universityName}
        </h3>
        <div className="py-2 text-center">
          {rating ? (
            <div className="flex justify-center items-center">
              <Rating className="text-orange-500" value={rating} disabled cancel={false} />
              <span className="ml-2 text-gray-800 dark:text-gray-200">
                {rating}
              </span>
            </div>
          ) : (
            <span className="text-gray-500">No Review Found</span>
          )}
        </div>

        <div className="flex items-center justify-between px-3 py-2 bg-gray-200 dark:bg-gray-700">
          <span className="font-bold text-gray-800 dark:text-gray-200">
            ${applicationFees}
          </span>
          <Link className="px-2 py-1 text-xs font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default TopScholarShipsCard;
