import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import UserReviewCard from "./UserReviewCard";


const UserReview = () => {
    const axiosPublic = useAxiosPublic()
    const {user} = useAuth()

    const {data: reviews = []} = useQuery({
        queryKey: ['reviews'],
        queryFn: async () => {
            const res = await axiosPublic.get(`/reviews?${user?.email}`)
            return res.data
        }
    })
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
                  <th>University Address</th>
                  <th>Application Feedback</th>
                  <th>Subject Category</th>
                  <th>Applied Degree</th>
                  <th>Application Fees</th>
                  <th>Service Charge</th>
                  <th>Application Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {reviews.map((review,index) => (
                  <UserReviewCard
                    key={review._id}
                    index={index}
                    review={review}
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