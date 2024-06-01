import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "../Hooks/useAxiosPublic";
import TopScholarShipsCard from "./TopScholarShipsCard";
import Loader from "../Utilities/Loader";

const TopScholarships = () => {
  const axiosPublic = useAxiosPublic();
  const { data: universities = [], isPending } = useQuery({
    queryKey: ["universities "],
    queryFn: async () => {
      const res = await axiosPublic.get("/university");
      return res.data;
    },
  });
  const filterUniversities = universities.sort((a, b) => a.applicationFees - b.applicationFees)
  if(isPending) return <Loader/>

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

      <div className="grid grid-cols md:grid-cols-3 lg:grid-cols-3 gap-6">
        {filterUniversities.slice(0,6)?.map((university) => (
          <TopScholarShipsCard
            key={university._id}
            university={university}
          ></TopScholarShipsCard>
        ))}
      </div>
    </div>
  );
};

export default TopScholarships;
