import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../../Hooks/useAxiosPublic";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loader from "../../Utilities/Loader";
import NodataFound from "../../Utilities/NodataFound";
import UserApplicationCard from "../Users/UserApplicationCard";

const ManageApplications = () => {
  const axiosPublic = useAxiosSecure();
  const { data: applications = [], isPending, refetch } = useQuery({
    queryKey: ["applications"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/applications`);
      return res.data;
    },
  });

  const [filterDeadline, setFilterDeadline] = useState("");
  const [filterPostDate, setFilterPostDate] = useState("");

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    if (name === "filterDeadline") {
      setFilterDeadline(value);
    } else if (name === "filterPostDate") {
      setFilterPostDate(value);
    }
  };

  if (isPending) return <Loader />;
  if (applications.length === 0) return <NodataFound />;

  // Function to filter applications based on deadline and post date
  const filteredApplications = applications.filter((application) => {
    const deadlineMatch =
      !filterDeadline || application.applicationDeadline === filterDeadline;
    const postDateMatch =
      !filterPostDate || application.postDate === filterPostDate;

    return deadlineMatch && postDateMatch;
  });
console.log(filteredApplications)
  return (
    <div className="mt-12">
      <h1 className="text-3xl font-bold mt-5">
        All Applications: {applications.length}
      </h1>
      <div className="my-4">
        <label className="text-gray-700">Filter by Application Deadline:</label>
        <input
          type="date"
          name="filterDeadline"
          value={filterDeadline}
          onChange={handleFilterChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
        />
      </div>
      <div className="my-4">
        <label className="text-gray-700">Filter by Post Date:</label>
        <input
          type="date"
          name="filterPostDate"
          value={filterPostDate}
          onChange={handleFilterChange}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring focus:ring-indigo-200 focus:border-indigo-300"
        />
      </div>
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
                <th>Feedback</th>
              </tr>
            </thead>
            <tbody>
              {/* rows */}
              {filteredApplications.map((application, index) => (
                <UserApplicationCard
                  key={application._id}
                  index={index}
                  application={application}
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

export default ManageApplications;
