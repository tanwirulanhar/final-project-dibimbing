import React from "react";
import HeroSection from "../HomePage/HeroSection";
import Register from "./Register";
import logo from "../../assets/logo.png";

const RegisterPage = () => {
  return (
    <div className="relative h-auto min-h-screen bg-white">
      <img
        src={logo}
        alt="logo"
        className="z-20 hidden h-40 ml-4 w-36 md:block "
      />
      <div className="relative flex flex-col min-h-screen gap-40 mt-10 md:flex-row md:-mt-28 ">
        <div className="z-10 hidden md:block">
          <HeroSection />
        </div>
        <div className="z-20">
          <Register />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
