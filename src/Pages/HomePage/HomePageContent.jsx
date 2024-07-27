import React from "react";
import Button from "../../Component/Element/Button/Button";
import vector2 from "../../assets/Group-1.png";
import { Link } from "react-router-dom";

const HomePageContent = () => {
  return (
    <div className="relative flex justify-between min-h-screen bg-white">
      <img src={vector2} alt="#" className="absolute top-0 z-0 -left-10" />

      <div className="z-10 pl-20 mt-44 ">
        <h1 className="mb-4 text-4xl font-bold text-green-600">
          Journey Beyond Horizons <br />
          Explore the Unseen Beauty
        </h1>
        <p className="pb-10 text-lg text-green-800 w-541">
          Take a step beyond the ordinary and explore the unseen beauty that
          lies beyond the horizon. <br />
          Every moment is a new adventure waiting to unfold.
        </p>
        <Link to={"/promoUser"}>
          {" "}
          <Button text="Explore" className="justify-center" />
        </Link>
      </div>
    </div>
  );
};

export default HomePageContent;
