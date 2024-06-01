import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import Loader from "../Utilities/Loader";
import TopScholarShipsCard from "./TopScholarShipsCard";

const AllScholarShips = () => {
  const axiosPublic = useAxiosPublic();
  const { data: universities = [], isPending } = useQuery({
    queryKey: ["universities "],
    queryFn: async () => {
      const res = await axiosPublic.get("/university");
      return res.data;
    },
  });
  const filterUniversities = universities.sort(
    (a, b) => a.applicationFees - b.applicationFees
  );
  if (isPending) return <Loader />;
  return (
    <div>
        <img className="md:h-[60vh] lg:h-[60vh] w-full" src="https://www.news10.com/wp-content/uploads/sites/64/2023/07/64c03fe900ce73.72717550.jpeg?w=2560&h=1440&crop=1" alt="" />
      <div className="mt-12 mb-48 max-w-6xl mx-auto">
        <div className="container p-4 mx-auto my-6 space-y-1 text-left">
          <span className="text-xs font-semibold tracking-wider uppercase dark:text-violet-600">
            your gateway to scholarships
          </span>
          <h2 className="pb-3 text-3xl font-bold md:text-4xl">
            All Scholarships
          </h2>
        </div>

        <div className="grid grid-cols md:grid-cols-3 lg:grid-cols-3 gap-6">
          {filterUniversities?.map((university) => (
            <TopScholarShipsCard
              key={university._id}
              university={university}
            ></TopScholarShipsCard>
          ))}
        </div>
        
      </div>
    </div>
  );
};

export default AllScholarShips;
