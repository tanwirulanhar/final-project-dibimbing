import React from "react";
import gambar1 from "../../assets/Group-1.png";
import gambarbulat1 from "../../assets/Ellipse-3.png";
import gambarbulat2 from "../../assets/Ellipse-4.png";

const DashboardBackground = () => {
  return (
    <div className="absolute left-0 w-full h-full top-10" z-0>
      <div className="relative mb-10">
        <div className="flex">
          <img
            className="relative max-w-full -top-14"
            src={gambar1}
            alt="Gambar"
          />
          <img
            className="absolute w-40 max-w-full -right-16 -top-3 h-44"
            src={gambarbulat1}
            alt="Gambar Bulat 1"
          />
        </div>
        <div className="relative flex mt-10">
          <img
            className="absolute w-40 max-w-full h-44 -left-24"
            src={gambarbulat2}
            alt="Gambar Bulat 2"
          />
          <img
            className="relative max-w-full ml-auto bottom-20 -right-10"
            src={gambar1}
            alt="Gambar2"
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardBackground;
