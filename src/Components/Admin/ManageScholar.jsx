import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loader from "../../Utilities/Loader";
import NodataFound from "../../Utilities/NodataFound";
import ManageScholarCard from "./ManageScholarCard";

const ManageScholar = () => {
  const axiosSecure = useAxiosSecure();

  const { data, refetch, isPending } = useQuery({
    queryKey: ['scholar'],
    queryFn: async () => {
      const res = await axiosSecure.get('/university');
      return res.data.universities; 
    }
  });

  if (isPending) return <Loader />;
  if (!data || data.length === 0) return <NodataFound />;

 

  return (
    <div className="mt-12">
      <h1 className="text-3xl font-bold mt-5">
        All Scholarship: {data.length}
      </h1>
      <div>
        <div className="overflow-x-auto">
          <table className="table">
            <thead>
              <tr>
                <th>No</th>
                <th>Scholarship Name</th>
                <th>University Name</th>
                <th>Subject Category</th>
                <th>Applied Degree</th>
                <th>Application Fees</th>
                <th>Details</th>
                <th>Delete</th>
                <th>Edit</th>
              </tr>
            </thead>
            <tbody>
              {data.map((scholar, index) => (
                <ManageScholarCard
                  key={scholar._id} 
                  index={index}
                  scholar={scholar}
                  refetch={refetch}
                />
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ManageScholar;
