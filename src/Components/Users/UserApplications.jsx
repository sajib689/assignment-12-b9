import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loader from "../../Utilities/Loader";
import UserApplicationCard from "./UserApplicationCard";

const UserApplications = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const { data: applications = [], isPending } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/applications?email=${user?.email}`);
      return res.data;
    },
  });

  if (isPending) return <Loader />;
  return (
    <div>
      <h1 className="text-3xl font-bold mt-5">
        All Applications: {applications.length}
      </h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>
                  <label>
                    <input type="checkbox" className="checkbox" />
                  </label>
                </th>
                <th>University Address</th>
                <th>Application Feedback</th>
                <th>Subject Category</th>
                <th>Applied Degree</th>
                <th>Application Fees</th>
                <th>Service Charge</th>
                <th>Application Status</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {applications.map((application) => (
                <UserApplicationCard
                  key={application._id}
                  application={application}
                ></UserApplicationCard>
              ))}
            </tbody>
            {/* foot */}
            <tfoot>
              <tr>
                <th></th>
                <th>University Address</th>
                <th>Application Feedback</th>
                <th>Subject Category</th>
                <th>Applied Degree</th>
                <th>Application Fees</th>
                <th>Service Charge</th>
                <th>Application Status</th>
                <th></th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserApplications;
