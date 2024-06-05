import { Rating } from "primereact/rating";

const ReviewCard = ({ review }) => {
  const {
    reviewer_image,
    reviewer_name,
    review_date,
    universityId,
    universityName,
    reviewer_rating,
    reviewer_comments,
  } = review;
  const date = new Date(review_date).toLocaleDateString();
  return (
    <div className="container flex flex-col w-full max-w-lg p-6 mx-auto divide-y rounded-md dark:divide-gray-300 dark:bg-gray-50 dark:text-gray-800">
      <div className="flex justify-between p-4">
        <div className="flex space-x-4">
          <div>
            <img
              src={reviewer_image}
              alt=""
              className="object-cover w-12 h-12 rounded-full dark:bg-gray-500"
            />
          </div>
          <div>
            <h4 className="font-bold">{reviewer_name}</h4>
            <span className="text-xs dark:text-gray-600">{date}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2 dark:text-yellow-700">
          <Rating value={reviewer_rating} disabled cancel={false} />

          <span className="text-xl font-bold">{reviewer_rating}</span>
        </div>
      </div>
      <div className="p-4 space-y-2 text-sm dark:text-gray-600">
        <p>{reviewer_comments}</p>
      </div>
    </div>
  );
};

export default ReviewCard;
