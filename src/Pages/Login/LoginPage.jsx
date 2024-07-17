import React from 'react';
import HeroSection from "../HomePage/HeroSection";
import Login from "./Login";
import logo from "../../assets/logo.png";

const LoginPage = () => {
  return (
    <div className="relative h-752">
      <img 
        src={logo} 
        alt="logo" 
        className="relative z-10 h-48 ml-20 w-44" 
      />
      <div className="relative z-20 flex justify-between min-h-screen -mt-28">
        <HeroSection />
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
