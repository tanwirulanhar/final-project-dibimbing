import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import Navbar from "../../../Navbar/Navbar";
import gambarBanner from "../../../../assets/Travel-banner2.png";
import useGetData from "../../../../hooks/useGatedata";
import Footer from "../../../Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import red from "../../../../assets/icon/red.png";
import green from "../../../../assets/icon/green.png";
import { useSelector } from "react-redux";

const PromoUser = () => {
  const { getData } = useGetData();
  const [promo, setPromo] = useState([]);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

  const darkMode = useSelector((state) => state.darkMode);

  useEffect(() => {
    const fetchPromo = async () => {
      const res = await getData("promos");
      if (res && res.data) {
        setPromo(res.data.data);
      }
    };
    fetchPromo();

    setNav1(sliderRef1);
    setNav2(sliderRef2);
  }, []);

  useEffect(() => {
    AOS.init({ duration: 1000 });
  }, []);

  const sliderSettingsMain = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  const sliderSettingsNav = {
    slidesToShow: 3,
    swipeToSlide: true,
    focusOnSelect: true,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  return (
    <div
      className={`overflow-x-hidden ${
        darkMode ? "bg-gray-900 text-white" : "bg-white text-black"
      }`}
    >
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <div
          className="relative flex flex-col p-4 bg-black bg-opacity-5 lg:flex-row lg:px-10"
          data-aos="fade-up"
        >
          <div className="relative p-6 mb-8 bg-gray-100 rounded-lg lg:w-1/3 lg:mb-0">
            <h1 className="text-2xl font-bold text-center text-green-900 md:text-3xl">
              Discover Unbeatable Travel Deals with Backpacker!
            </h1>
            <p className="text-lg text-center text-green-600 md:text-xl">
              It’s time to explore the world with Backpacker’s exclusive
              promotions. From stunning beaches to vibrant cityscapes, we offer
              incredible savings on top destinations. Whether you're seeking a
              tropical getaway, an adventurous journey, or a peaceful retreat,
              Backpacker has the perfect deals for you. Don’t miss out on these
              limited-time offers—start your adventure with Backpacker today and
              create memories that will last a lifetime!
            </p>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent to-gray-100 opacity-80"></div>
          </div>

          <div className="relative h-64 lg:w-2/3 lg:h-auto">
            <img
              src={gambarBanner}
              alt="img"
              className="object-cover w-full h-full rounded-lg"
              loading="lazy"
            />
            <div className="absolute inset-0 opacity-50 bg-gradient-to-r from-black via-transparent to-transparent"></div>
          </div>
        </div>

        {/* Bagian Data */}
        <div className="py-12 mb-10">
          <h1 className="mb-4 text-3xl font-bold text-center text-green-800">
            Promo Destinations
          </h1>
          <p className="mb-12 text-center text-green-600">
            "Discover Your Dream Destinations"
          </p>
          <div className="max-w-screen-xl mx-auto">
            <Slider
              {...sliderSettingsMain}
              asNavFor={nav2}
              ref={(slider) => (sliderRef1 = slider)}
            >
              {Array.isArray(promo) &&
                promo.map((data, index) => (
                  <div key={index} className="px-4">
                    <div
                      key={data.id}
                      className="relative flex flex-col gap-4 p-6 mb-10 transition-transform duration-300 ease-in-out transform bg-gray-200 border rounded-lg shadow-lg lg:mb-4 hover:scale-105 hover:shadow-xl"
                      data-aos="fade-up"
                    >
                      <div className="relative w-full">
                        <img
                          src={data.imageUrl}
                          alt={data.title}
                          className="object-cover w-full h-64 rounded-lg"
                        />
                        <p className="absolute top-0 right-0 flex items-center justify-center w-1/2 h-full text-xl font-bold text-white bg-black bg-opacity-50">
                          <div className="text-center">
                            <h2 className="mb-5 text-xl font-bold text-white">
                              {data.title}
                            </h2>
                            <p className="hidden px-6 text-sm font-semibold text-white lg:block">
                              {data.description}
                            </p>
                            <p className="mt-4 text-sm font-bold text-white">
                              Discount Price : &nbsp;&nbsp;
                              <s className="text-red-500">
                                {formatPrice(data.promo_discount_price)}
                              </s>
                            </p>
                          </div>
                        </p>
                      </div>

                      <div className="text-left">
                        <p className="flex text-base font-bold text-green-700">
                          Minimum Claim Price: &nbsp;&nbsp;
                          <p className="text-green-800">
                            {formatPrice(data.promo_discount_price)}
                          </p>
                        </p>

                        <p className="text-base font-bold text-green-700">
                          Term Condition: &nbsp;&nbsp;
                          <span className="font-semibold text-green-600">
                            {data.terms_condition}
                          </span>
                        </p>
                        <div className="flex flex-col gap-4 pt-4 md:flex-row">
                          <p className="flex gap-2 text-sm font-semibold">
                            <img src={red} alt="created" />
                            <span className="text-green-700">
                              {new Date(data.createdAt).toLocaleDateString()}
                            </span>
                          </p>
                          <p className="flex gap-2 text-sm font-semibold">
                            <img src={green} alt="updated" />
                            <span className="text-green-700">
                              {new Date(data.updatedAt).toLocaleDateString()}
                            </span>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </Slider>
            <Slider
              {...sliderSettingsNav}
              asNavFor={nav1}
              ref={(slider) => (sliderRef2 = slider)}
              className="mt-6"
            >
              {Array.isArray(promo) &&
                promo.map((data, index) => (
                  <div key={index} className="px-2 py-1 cursor-pointer">
                    <img
                      src={data.imageUrl}
                      alt={data.title}
                      className="object-cover w-full h-32 rounded-lg"
                    />
                  </div>
                ))}
            </Slider>
          </div>
        </div>

        <Footer />
      </div>
    </div>
  );
};

export default PromoUser;
