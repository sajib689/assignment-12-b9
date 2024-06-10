import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import TopScholarShipsCard from "./TopScholarShipsCard";
import Loader from "../Utilities/Loader";
import { Link } from "react-router-dom";
import { useState } from "react";

const TopScholarships = () => {
  const axiosPublic = useAxiosPublic();
  const [page, setPage] = useState(1);
  const limit = 6;

  const { data: universitiesData = {}, isPending } = useQuery({
    queryKey: ["universities", page],
    queryFn: async () => {
      const res = await axiosPublic.get(`/university?page=${page}&limit=${limit}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  if (isPending) return <Loader />;

  const filterUniversities = universitiesData.universities || [];

  return (
    <div className="mt-48 mb-24 max-w-6xl mx-auto">
      <div className="container p-4 mx-auto my-6 space-y-1 text-center">
        <span className="text-xs font-semibold tracking-wider uppercase dark:text-violet-600">
          your gateway to scholarships
        </span>
        <h2 className="pb-3 text-3xl font-bold md:text-4xl">
          Top Scholarships
        </h2>
        <p>
          Find the perfect scholarship for you! ScholarHub offers a curated
          selection <br /> of scholarships from around the world. Whether you're
          looking for <br /> undergraduate, postgraduate, or doctoral
          opportunities, <br /> we have you covered.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
        {filterUniversities.map((university) => (
          <TopScholarShipsCard
            key={university._id}
            university={university}
          ></TopScholarShipsCard>
        ))}
      </div>
      <div className="flex justify-center items-center mt-12">
        <Link to='/allScholarShips' className="px-6 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-lg hover:bg-blue-500 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-80">
          View All
        </Link>
      </div>
      {/* <div className="flex justify-center mt-4">
        <button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 mx-1 text-white bg-blue-500 rounded disabled:bg-gray-400"
        >
          Previous
        </button>
        <button
          onClick={() => setPage((prev) => prev + 1)}
          disabled={page === universitiesData.pages}
          className="px-4 py-2 mx-1 text-white bg-blue-500 rounded disabled:bg-gray-400"
        >
          Next
        </button>
      </div> */}
    </div>
  );
};

export default TopScholarships;
