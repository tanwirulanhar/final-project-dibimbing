import React from "react";
import HeroSection from "../HomePage/HeroSection";
import Login from "./Login";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";

const LoginPage = () => {
  return (
    <div className="relative h-752">
      <Link to={"/"}>
        {" "}
        <img
          src={logo}
          alt="logo"
          className="z-20 hidden h-40 ml-4 cursor-pointer w-36 md:block"
        />
      </Link>

      <div className="relative z-20 flex gap-28 -mt-28">
        <HeroSection height="h-362" width="w-full" className="left-36" />
        <Login />
      </div>
    </div>
  );
};

export default LoginPage;
