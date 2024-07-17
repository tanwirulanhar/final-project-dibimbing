import React from "react";
import hero from "../../assets/hero-final.png";
import elips from "../../assets/Ellipse-3.png";
import elips2 from "../../assets/Ellipse-4.png";
import vector from "../../assets/Group-2.png";

const HeroSection = () => {
  return (
    <div className="relative flex justify-between min-h-screen pl-14">
      <div className="relative flex items-center justify-center ml-10 mr-10">
        <img
          src={elips}
          alt="elips"
          className="absolute z-10 w-32 h-32 -right-10 top-10"
        />
        <img
          src={hero}
          alt="hero"
          className="z-20 mx-auto bg-white shadow-sm rounded-3xl w-633 h-489"
        />
        <img
          src={elips2}
          alt="elips2"
          className="absolute z-10 w-32 h-32 bottom-10 -left-10"
        />
      </div>

      <img
        src={vector}
        alt="vector"
        className="absolute bottom-0 z-10 -right-28"
      />
    </div>
  );
};

export default HeroSection;
