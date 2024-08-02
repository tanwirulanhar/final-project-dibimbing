import React from "react";
import HeroSection from "../HomePage/HeroSection";
import Register from "./Register";
import logo from "../../assets/logo-baru.png";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const navigate = useNavigate();

  const handleLogo = () => {
    navigate("/");
  };

  return (
    <div className="relative min-h-screen bg-white">
      <div className="absolute top-0 left-0 z-40 mt-8 ml-8 cursor-pointer md:ml-16">
        <img
          src={logo}
          alt="logo"
          className="object-cover w-24 h-12 md:h-16 md:w-32 "
          onClick={handleLogo}
        />
      </div>

      <div className="relative flex flex-col min-h-screen md:flex-row">
        <div className="hidden w-full md:block md:w-1/2">
          <HeroSection height="h-362" width="w-full" />
        </div>
        <div className="z-50 flex items-center justify-center w-full p-4 md:w-1/2 md:p-8">
          <Register />
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
