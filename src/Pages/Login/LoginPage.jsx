import React from "react";
import HeroSection from "../HomePage/HeroSection";
import Login from "./Login";
import logo from "../../assets/logo-baru.png";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="relative flex flex-col min-h-screen bg-white md:flex-row">
      <div className="absolute top-0 left-0 z-40 p-4 md:p-6">
        <Link to={"/"}>
          <img
            src={logo}
            alt="logo"
            className="object-cover w-24 h-12 md:h-16 md:w-28 lg:w-32"
          />
        </Link>
      </div>

      <div className="flex flex-col flex-1 md:flex-row">
        <div className="hidden md:block md:w-1/2">
          <HeroSection height="h-362" width="w-full" />
        </div>

        <div className="flex items-center justify-center flex-1 p-4 md:p-10">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
