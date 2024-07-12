import React from 'react';
import HeroSection from "../HomePage/HeroSection";
import Register from "./Register";
import logo from "../../assets/logo.png";

const RegisterPage = () => {
  return (
    <div className="relative h-752">
      <img 
        src={logo} 
        alt="logo" 
        className="z-20 w-44 h-48  ml-20 " 
      />
      <div className="relative flex justify-between min-h-screen z-10 -mt-28">
        <HeroSection />
        <Register />
      </div>
    </div>
  );
};

export default RegisterPage;
