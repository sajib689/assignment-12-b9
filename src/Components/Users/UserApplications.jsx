import { useQuery } from "@tanstack/react-query";
import useAuth from "../../Hooks/useAuth";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import Loader from "../../Utilities/Loader";
import UserApplicationCard from "./UserApplicationCard";
import NodataFound from "../../Utilities/NodataFound";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const UserApplications = () => {
  const { user } = useAuth();
  const axiosPublic = useAxiosPublic();
  const axiosSecure = useAxiosSecure();
  const { data: role = [] } = useQuery({
    queryKey: ["role", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/role/${user?.email}`);
      return res.data;
    },
  });
  const {
    data: applications = [],
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/applications?email=${user?.email}`);
      return res.data;
    },
  });

  if (isPending) return <Loader />;
  if (applications.length === 0) return <NodataFound />;
  return (
    <div className="mt-12">
      <h1 className="text-3xl font-bold mt-5">
        All Applications: {applications.length}
      </h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            {/* head */}
            <thead>
              <tr>
                <th>No</th>
                <th>University Name</th>
                <th>University Address</th>
                <th>Application Feedback</th>
                <th>Subject Category</th>
                <th>Applied Degree</th>
                <th>Application Fees</th>
                <th>Service Charge</th>
                <th>Application Status</th>
                <th>Delete</th>
                <th>Update</th>
                {role.role === "user" && <th>Add Review</th>}
              </tr>
            </thead>
            <tbody>
              {/* row 1 */}
              {applications.map((application, index) => (
                <UserApplicationCard
                  key={application._id}
                  index={index}
                  application={application}
                  refetch={refetch}
                ></UserApplicationCard>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default UserApplications;
