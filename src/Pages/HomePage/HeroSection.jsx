import React from "react";
import hero from "../../assets/hero-final.png";
import elips from "../../assets/Ellipse-3.png";
import elips2 from "../../assets/Ellipse-4.png";
import vector from "../../assets/Group-2.png";

const HeroSection = ({ height, width }) => {
  return (
    <div className="relative z-10 flex justify-between w-full h-10 min-h-screen pl-14">
      <div className="relative flex items-center justify-center ml-10 mr-10">
        <img
          src={elips}
          alt="elips"
          className="absolute z-0 w-32 h-32 -right-10 top-20"
        />
        <img
          src={hero}
          alt="hero"
          className={`z-20 mx-auto bg-white shadow-sm rounded-3xl ${width} ${height}`}
        />
        <img
          src={elips2}
          alt="elips2"
          className="absolute z-0 w-32 h-32 bottom-20 -left-10"
        />
      </div>

      <img
        src={vector}
        alt="vector"
        className="absolute bottom-0 right-0 z-0"
      />
    </div>
  );
};

export default HeroSection;
