import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loader from "../../Utilities/Loader";
import NodataFound from "../../Utilities/NodataFound";
import ManageReviewCard from "./ManageReviewCard";

const ManageReview = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();

  const {
    data: reviews = [],
    refetch,
    isPending,
  } = useQuery({
    queryKey: ["reviews"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/reviews`);
      return res.data;
    },
  });
  if (isPending) return <Loader />;
  if (reviews.length === 0) return <NodataFound />;
  return (
    <div className="mt-12">
      <h1 className="text-3xl font-bold mt-5 mb-5">All Reviews: {reviews.length}</h1>
      <div>
        <div className="overflow-x-auto">
          <div className="grid grid-cols md:grid-cols-3 lg:grid-cols-3 gap-6">
           
            {reviews.map((review, index) => (
              <ManageReviewCard
                key={review._id}
                index={index}
                review={review}
                refetch={refetch}
              ></ManageReviewCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ManageReview;
