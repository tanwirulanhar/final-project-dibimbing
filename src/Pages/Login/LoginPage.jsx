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
        className="z-20 hidden h-40 ml-4 w-36 md:block" 
       
      />
      <div className="relative z-20 flex justify-between min-h-screen -mt-28">
        <HeroSection />
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
