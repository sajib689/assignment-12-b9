import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import NodataFound from "../../Utilities/NodataFound";
import Loader from "../../Utilities/Loader";
import ManageUsersCard from "./ManageUsersCard";


const ManageUsers = () => {
    const axiosSecure = useAxiosSecure()
    const {data: users = [], refetch, isPending} = useQuery({
        queryKey: ['users'],
        queryFn: async () => {
            const res = await axiosSecure.get('/users')
            return res.data
        }
    })
    if(isPending) return <Loader/>
    if(users.length === 0) return <NodataFound/>
    return (
        <div className="mt-12">
        <h1 className="text-3xl font-bold mt-5">
          All Users: {users.length}
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
                  
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Delete</th>
                  <th>Change Role</th>
                </tr>
              </thead>
              <tbody>
                {/* row 1 */}
                {users.map((userAll,index) => (
                  <ManageUsersCard
                    key={userAll._id}
                    index={index}
                    userAll={userAll}
                    refetch={refetch}
                  ></ManageUsersCard>
                ))}
              </tbody>
             
            </table>
          </div>
        </div>
      </div>
    );
};

export default ManageUsers;