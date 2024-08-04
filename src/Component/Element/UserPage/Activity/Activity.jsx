import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import useGetData from "../../../../hooks/useGatedata";
import gambarBanner from "../../../../assets/Banner-Activity.png";
import Footer from "../../../Footer/Footer";
import Navbar from "../../../Navbar/Navbar";
import { Link } from "react-router-dom";
import Star from "../../../../assets/icon/Star.png";
import AOS from "aos";
import red from "../../../../assets/icon/red.png";
import green from "../../../../assets/icon/green.png";
import "aos/dist/aos.css";

const Activity = () => {
  const { getData } = useGetData();
  const [activity, setActivity] = useState([]);

  useEffect(() => {
    AOS.init();
  }, []);

  useEffect(() => {
    const fetchActivity = async () => {
      const res = await getData("activities");
      if (res && res.data) {
        setActivity(res.data.data);
      }
    };
    fetchActivity();
  }, []);

  const settings2 = {
    dots: false,
    infinite: true,
    speed: 2000,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,
    cssEase: "linear",
  };

  return (
    <div className="relative overflow-x-hidden">
      <Navbar />
      <div className="relative w-full">
        <div className="flex flex-col md:flex-row">
          {/* Banner Section */}
          <div className="relative w-full md:w-1/2">
            <img
              src={gambarBanner}
              alt="Banner"
              className="object-cover w-full h-auto"
              loading="lazy"
            />
          </div>

          {/* Carousel Section */}
          <div className="relative w-full mt-6 md:w-1/2 md:mt-0">
            <Slider {...settings}>
              {activity.length > 0 &&
                activity.map((data) => (
                  <div key={data.id} className="relative" data-aos="fade-up">
                    <img
                      src={data.imageUrls[0]}
                      alt="Activity"
                      className="object-cover w-full h-64 md:h-96"
                    />
                    <p className="absolute inset-0 flex items-center justify-center text-xl font-bold text-white bg-black bg-opacity-50">
                      {/* <Link to={`/activity/${data.id}`}>{data.title}</Link> */}
                    </p>
                  </div>
                ))}
            </Slider>
          </div>
        </div>

      </div>

      <div className="w-full p-6 mt-10 border-l-2 border-green-500 md:p-10 ">
        <h1
          className="pb-4 text-2xl font-bold text-center text-green-800 md:text-4xl "
          data-aos="fade-down"
        >
          Our Activity
        </h1>
        <p
          className="text-lg font-normal text-center text-green-600 md:text-2xl "
          data-aos="fade-up"
        >
          Unleash your adventurous spirit with our curated activities. From
          thrilling outdoor escapades to serene nature walks, we have something
          for everyone.
        </p>
      </div>

      <div className="flex flex-col h-auto gap-6 p-6 mt-10 bg-green-700 pb-36 md:flex-row md:p-10">
        <div className="w-full md:w-1/2">
          <Slider {...settings2}>
            {activity.map((data) => (
              <div key={data.id} className="p-4" data-aos="zoom-in">
                <Link to={`/activity/${data.id}`}>
                  <div className="relative flex flex-col p-2 transition-transform duration-300 ease-in-out transform bg-white border rounded-lg shadow-lg hover:scale-105 hover:shadow-xl">
                    <img
                      className="object-cover w-full h-32 mb-4 rounded-lg cursor-pointer md:h-40"
                      src={data.imageUrls[0] || "placeholder-image-url"}
                      alt="activity"
                    />
                    <div className="flex flex-col items-start justify-between md:flex-row md:items-center">
                      <h2 className="text-sm font-bold text-green-500">
                        {data.title}
                      </h2>
                      <div className="flex items-center mt-2 md:mt-0">
                        <p className="text-green-800">{data.rating}</p>
                        <img src={Star} alt="Star" className="w-4 h-4 ml-2" />
                      </div>
                    </div>

                    <div className="flex flex-col gap-2 pt-2 pb-2 md:flex-row">
                      <p className="flex items-center gap-2 text-sm font-semibold">
                        <img src={red} alt="Red Icon" />
                        <span className="text-green-700">
                          {new Date(data.createdAt).toLocaleDateString()}
                        </span>
                      </p>
                      <p className="flex items-center gap-2 text-sm font-semibold">
                        <img src={green} alt="Green Icon" />
                        <span className="text-green-700">
                          {new Date(data.updatedAt).toLocaleDateString()}
                        </span>
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
        <div
          className="flex flex-col items-center justify-center w-full p-6 md:w-1/2 md:p-8"
          data-aos="fade-left"
        >
          <h1 className="mb-4 text-xl font-bold text-white md:text-2xl">
            Adventure Awaits
          </h1>
          <p className="text-base text-center text-green-100 md:text-lg">
            From hiking through lush forests to diving into crystal-clear
            waters, embark on exciting adventures that ignite your spirit of
            exploration. Our diverse range of activities ensures there's
            something for every adventurer.
          </p>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Activity;
