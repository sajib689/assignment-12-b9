import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Loader from "../Utilities/Loader";
import TopScholarShipsCard from "./TopScholarShipsCard";
import { useState } from "react";

const AllScholarShips = () => {
  const axiosPublic = useAxiosPublic();
  const [storeSearcher, setStoreSearcher] = useState("");
  const [page, setPage] = useState(1);
  const limit = 6;

  // Fetch initial data and data based on search
  const { data: universitiesData = { universities: [], total: 0, page: 1, pages: 1 }, isLoading, isError, error } = useQuery({
    queryKey: ["universities", storeSearcher, page],
    queryFn: async () => {
      const query = storeSearcher ? `?query=${storeSearcher}&page=${page}&limit=${limit}` : `?page=${page}&limit=${limit}`;
      const res = await axiosPublic.get(`/university${query}`);
      console.log('API Response:', res.data);  // Debug log
      return res.data;
    },
    keepPreviousData: true,
    enabled: true, // Fetch data even without a search query
  });

  // Debug log to inspect state
  console.log('Fetched Universities Data:', universitiesData);

  const filterUniversities = universitiesData.universities || [];

  const handleSearch = (e) => {
    e.preventDefault();
    const form = e.target;
    const searchValue = form.searchValue.value.trim();
    setStoreSearcher(searchValue);
    setPage(1); 
  };

  if (isLoading) return <Loader />;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div>
      <img
        className="md:h-[60vh] lg:h-[60vh] w-full"
        src="https://www.news10.com/wp-content/uploads/sites/64/2023/07/64c03fe900ce73.72717550.jpeg?w=2560&h=1440&crop=1"
        alt="Scholarships"
      />
      <div className="mt-12 mb-48 max-w-6xl mx-auto">
        <div className="container p-4 mx-auto my-6 space-y-1 text-left">
          <span className="text-xs font-semibold tracking-wider uppercase dark:text-violet-600">
            Your Gateway to Scholarships
          </span>
          <h2 className="pb-3 text-3xl font-bold md:text-4xl">
            All Scholarships
          </h2>
        </div>
        <form onSubmit={handleSearch} className="flex w-[280px] mb-5">
          <input
            name="searchValue"
            className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="search"
            type="text"
            placeholder="Search here"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline">
            Search
          </button>
        </form>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filterUniversities.length > 0 ? (
            filterUniversities.map((university) => (
              <TopScholarShipsCard
                key={university._id}
                university={university}
              />
            ))
          ) : (
            <p>No scholarships found.</p>
          )}
        </div>
        {universitiesData.pages > 1 && (
          <div className="flex justify-center mt-4">
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
          </div>
        )}
      </div>
    </div>
  );
};

export default AllScholarShips;
