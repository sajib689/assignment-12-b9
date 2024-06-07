import BannerSlider from "../Components/BannerSlider";
import StudentReview from "../Components/StudentReview";
import TopScholarships from "../Components/TopScholarships";
import Contact from './../Components/Contact';


const Home = () => {
    return (
        <div>
            <BannerSlider/>
            <TopScholarships/>
            <StudentReview/>
            <Contact/>
        </div>
    );
};

export default Home;