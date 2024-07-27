import Banner from "../../../Component/Banner";
import Footer from "../../../Component/Footer/Footer";
import CarauselPromo from "../../../Component/Fragments/Caraousel/CaraouselPromo/CarauselPromo";
import Navbar from "../../../Component/Navbar/Navbar";
import CategoryCaraosel from "../../../Component/Fragments/Caraousel/CaraoseulCategory/CategoryCaraousel"
import HeroSection from "../HeroSection";
import HomePageContent from "../HomePageContent";

const HomePage = () => {
  return (
    <div>
      <Navbar />
      <div className="flex gap-16">
        <HomePageContent />
        <HeroSection height="h-362" width="w-500" />
      </div>
      <CarauselPromo/>
      <CategoryCaraosel/>
      <Banner />
      <Footer />
    </div>
  );
};

export default HomePage;
