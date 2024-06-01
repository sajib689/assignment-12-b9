import { Rating } from "primereact/rating";

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
          <button className="px-2 py-1 text-xs font-semibold text-white uppercase transition-colors duration-300 transform bg-gray-800 rounded hover:bg-gray-700 dark:hover:bg-gray-600 focus:bg-gray-700 dark:focus:bg-gray-600 focus:outline-none">
            Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default TopScholarShipsCard;
