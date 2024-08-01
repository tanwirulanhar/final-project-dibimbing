import React from "react";
import HeroSection from "../HomePage/HeroSection";
import Login from "./Login";
import logo from "../../assets/logo-baru.png";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="relative min-h-screen px-20 py-10 bg-white">
      <div className="absolute top-0 left-0 z-40 mt-6 ml-16 cursor-pointer">
        <Link to={"/"}>
          <img
            src={logo}
            alt="logo"
            className="object-cover h-16 w-28 md:w-32"
          />
        </Link>
      </div>

      <div className="relative flex flex-col min-h-screen md:flex-row">
        <div className="hidden w-1/2 md:block">
          <HeroSection height="h-362" width="w-full" />
        </div>
        <div className="z-50 w-full md:w-1/2">
          <Login />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
