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
      <div className="flex flex-col-reverse lg:flex-row lg:gap-16 lg:items-start" data-aos="fade-up">
        <HomePageContent />
        <HeroSection height="h-auto" width="w-500" className="hidden lg:block" />
      </div>
      <div data-aos="fade-up" className="w-full lg:mt-0">
        <CarauselPromo />
      </div>
      <div data-aos="fade-up" className="w-full mt-8 lg:mt-16">
        <CategoryCaraosel />
      </div>
      <div data-aos="fade-up" className="w-full mt-8 lg:mt-16">
        <Banner />
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
