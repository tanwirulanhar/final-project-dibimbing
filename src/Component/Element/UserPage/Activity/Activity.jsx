import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import useGetData from "../../../../hooks/useGatedata";
import gambarBanner from "../../../../assets/Banner-Activity.png";
import Footer from "../../../Footer/Footer";
import Navbar from "../../../Navbar/Navbar";
import { Link } from "react-router-dom";

const Activity = () => {
  const { getData } = useGetData();
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    const fetchActivity = async () => {
      const res = await getData("activities");
      if (res && res.data) {
        setActivity(res.data.data);
      }
    };
    fetchActivity();
  }, [getData]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    cssEase: "linear",
    appendDots: (dots) => (
      <div style={dotsContainerStyle}>
        <ul style={{ margin: "0px" }}>{dots}</ul>
      </div>
    ),
    customPaging: (i) => (
      <div style={dotStyle}>
        <span style={dotInnerStyle}></span>
      </div>
    ),
  };

  const dotsContainerStyle = {
    position: "absolute",
    bottom: "10px",
    left: "50%",
    transform: "translateX(-50%)",
    display: "flex",
    justifyContent: "center",
    width: "auto",
  };

  const dotStyle = {
    width: "10px",
    height: "10px",
    margin: "0 5px",
    background: "white",
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  const dotInnerStyle = {
    width: "100%",
    height: "100%",
    borderRadius: "50%",
    background: "rgba(0, 0, 0, 0.5)",
  };

  return (
    <div>
      <Navbar />
      <div className="relative w-full h-full">
        <div className="flex">
          {/* Banner Section */}
          <div className="relative w-1/2">
            <img
              src={gambarBanner}
              alt="Banner"
              className="object-cover w-full h-auto"
            />
          </div>

          {/* Carousel Section */}
          <div className="relative w-1/2 h-full">
            {activity.length > 0 && (
              <Slider {...settings}>
                {activity.map((data) => (
                  <div key={data.id} className="relative">
                    <img
                      src={data.imageUrls}
                      alt="Activity"
                      className="object-cover w-full h-96"
                    />
                    <p className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white bg-black bg-opacity-50">
                      <Link to={`/activity/${data.id}`}>{data.title}</Link>
                    </p>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Activity;
