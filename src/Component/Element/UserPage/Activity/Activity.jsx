import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import useGetData from "../../../../hooks/useGatedata";
import gambarBanner from "../../../../assets/Banner-Activity.png";
import Footer from "../../../Footer/Footer";
import Navbar from "../../../Navbar/Navbar";
import { Link } from "react-router-dom";
import { format } from "date-fns";

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

  const settings2 = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
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
    <div className="overflow-x-hidden">
      <Navbar />
      <div className="relative w-full h-full ">
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

      <div className="items-center justify-center mt-24 column">
        <h1 className="mb-6 text-4xl font-bold text-center text-green-800">Our Activity</h1>
        <p className="text-2xl font-normal text-center text-green-600 px-28 ">
          Unleash your adventurous spirit with our curated activities. From
          thrilling outdoor escapades to serene nature walks, we have something
          for everyone. Join us and create unforgettable memories.
        </p>
      </div>

      <div className="flex w-full gap-6 p-6 px-20 py-10 mt-10 mb-20 bg-green-700 h-96 ">
        <div className="w-1/2">
          <Slider {...settings2}>
            {activity.map((data) => (
              <div key={data.id} className="p-4">
                <Link to={`/activity/${data.id}`}>
                  <div className="relative flex flex-col p-2 transition-transform duration-300 ease-in-out transform bg-white border rounded-lg shadow-lg hover:scale-105 hover:shadow-xl">
                    <img
                      className="object-cover w-full h-40 mb-4 rounded-lg cursor-pointer"
                      src={data.imageUrls[0] || "placeholder-image-url"}
                      alt="activity"
                    />
                    <h2 className="text-sm font-bold text-green-500">
                      {data.title}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Created: {format(new Date(data.createdAt), "dd-MM-yyyy")}
                    </p>
                    <p className="text-sm text-gray-600">
                      Last Updated:{" "}
                      {format(new Date(data.updatedAt), "dd-MM-yyyy")}
                    </p>
                  </div>
                </Link>
              </div>
            ))}
          </Slider>
        </div>
        <div className="flex flex-col items-center justify-center w-1/2 p-8">
          <h1 className="mb-6 text-2xl font-bold text-white">
            Adventure Awaits
          </h1>
          <p className="text-lg text-center text-green-100">
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
