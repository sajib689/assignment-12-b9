import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import UserReviewCard from "./UserReviewCard";
import Loader from "../../Utilities/Loader";
import NodataFound from "../../Utilities/NodataFound";
import useAxiosSecure from "../../Hooks/useAxiosSecure";


const UserReview = () => {
    const axiosPublic = useAxiosSecure()
    const {user} = useAuth()

    const {data: reviews = [],refetch,isPending} = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/reviews?email=${user?.email}`)
            return res.data
        }
    })
    if(isPending) return <Loader/>
    if(reviews.length === 0) return <NodataFound/>
    return (
        <div className="mt-12">
        <h1 className="text-3xl font-bold mt-5">
          All Reviews: {reviews.length}
        </h1>
        <div>
          <div className="overflow-x-auto">
            <table className="table">
              {/* head */}
              <thead>
                <tr>
                  <th>
                  No
                  </th>
                  
                  <th>University Name</th>
                  <th>Review Comments</th>
                  <th>Applied Degree</th>
                  <th>Review Date</th>
                  <th>Update</th>
                  <th>Delete</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {reviews.map((review,index) => (
                  <UserReviewCard
                    key={review._id}
                    index={index}
                    review={review}
                    refetch={refetch}
                  ></UserReviewCard>
                ))}
              </tbody>
             
            </table>
          </div>
        </div>
      </div>
    );
};

export default UserReview;