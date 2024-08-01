import React from "react";
import Button from "../../Component/Element/Button/Button";
import vector2 from "../../assets/Group-1.png";
import { Link } from "react-router-dom";

const HomePageContent = () => {
  return (
    <div className="relative flex flex-col items-center justify-center min-h-screen lg:h-auto -top-20 lg:flex-row">
      <img src={vector2} alt="#" className="absolute top-0 z-0 hidden lg:-left-10 lg:block" />

      <div className="z-10 px-4 text-center -mt-9 lg:pl-20 lg:mt-44 lg:text-left">
        <h1 className="mb-4 text-2xl font-bold text-green-600 lg:text-4xl">
          Journey Beyond Horizons <br />
          Explore the Unseen Beauty
        </h1>
        <p className="mb-10 text-base text-green-800 lg:text-lg lg:w-541 lg:pb-0">
          Take a step beyond the ordinary and explore the unseen beauty that
          lies beyond the horizon. <br />
          Every moment is a new adventure waiting to unfold.
        </p>
        <Link to={"/promoUser"} >
          <Button text="Explore" className="justify-center" />
        </Link>
      </div>
    </div>
  );
};

export default HomePageContent;
