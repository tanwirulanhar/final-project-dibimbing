import React, { useEffect } from "react";
import Banner from "../../../Component/Banner";
import Footer from "../../../Component/Footer/Footer";
import CarauselPromo from "../../../Component/Fragments/Caraousel/CaraouselPromo/CarauselPromo";
import Navbar from "../../../Component/Navbar/Navbar";
import CategoryCaraosel from "../../../Component/Fragments/Caraousel/CaraoseulCategory/CategoryCaraousel";
import HeroSection from "../HeroSection";
import HomePageContent from "../HomePageContent";
import AOS from "aos";
import "aos/dist/aos.css";

const HomePage = () => {
  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  return (
    <div className="overflow-x-hidden">
      <Navbar />
      <div className="flex flex-col-reverse -top-20 lg:flex-row lg:gap-16" data-aos="fade-up">
        <HomePageContent />
        <HeroSection height="h-362" width="w-500" />
      </div>
      <div data-aos="fade-up">
        <CarauselPromo />
      </div>
      <div data-aos="fade-up">
        <CategoryCaraosel />
      </div>
      <div data-aos="fade-up">
        <Banner />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
