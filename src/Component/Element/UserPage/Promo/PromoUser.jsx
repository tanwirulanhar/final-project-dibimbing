import React, { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import Navbar from "../../../Navbar/Navbar";
import gambarBanner from "../../../../assets/Travel-banner.png";
import useGetData from "../../../../hooks/useGatedata";
import Footer from "../../../Footer/Footer";
import AOS from "aos";
import "aos/dist/aos.css";
import red from "../../../../assets/icon/red.png";
import green from "../../../../assets/icon/green.png";

const PromoUser = () => {
  const { getData } = useGetData();
  const [promo, setPromo] = useState([]);
  const [nav1, setNav1] = useState(null);
  const [nav2, setNav2] = useState(null);
  let sliderRef1 = useRef(null);
  let sliderRef2 = useRef(null);

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
  }, [getData]);

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
  };

  // Fungsi format harga
  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(price);
  };

  return (
    <div>
      <Navbar />
      <div className="relative flex " data-aos="fade-up">
        <div className="relative w-1/3 p-10 space-y-4 overflow-hidden bg-gray-100 rounded-lg">
          <h1 className="pt-6 text-2xl font-bold text-center text-green-900">
            Discover Unbeatable Travel Deals with Backpacker!
          </h1>
          <p className="text-lg text-center text-green-600">
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

        <div className="relative w-2/3 h-1/2">
          <img
            src={gambarBanner}
            alt="img"
            className="object-cover w-full h-full"
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
                    className="relative flex gap-8 px-6 py-4 mb-10 transition-transform duration-300 ease-in-out transform bg-gray-200 border rounded-lg shadow-lg hover:scale-105 hover:shadow-xl"
                    data-aos="fade-up"
                  >
                    <img
                      src={data.imageUrl}
                      alt={data.title}
                      className="object-cover w-1/2 h-64 mb-4 rounded-lg"
                    />
                    <div className="text-left">
                      <h2 className="pb-6 text-xl font-bold text-green-500">
                        {data.title}
                      </h2>
                      <p className="pb-1 text-sm font-bold text-green-700">
                        Description : &nbsp;&nbsp;{" "}
                        <span className="text-sm font-semibold text-green-400">
                          {data.description}
                        </span>
                      </p>
                      <p className="pb-1 text-sm font-bold text-green-700 ">
                        Minimium Claim Price : &nbsp;&nbsp;
                        <s className="text-red-500">
                          {formatPrice(data.promo_discount_price)}
                        </s>
                      </p>
                      <p className="pb-1 text-sm font-bold text-green-700">
                        Promo Discount Price : &nbsp;&nbsp;
                        <span className="text-green-500">
                          {formatPrice(data.promo_discount_price)}
                        </span>
                      </p>
                      <p className="text-sm font-bold text-green-700 ">
                        Term Condition : &nbsp;&nbsp;
                        <span className="font-semibold text-green-400">
                          {data.terms_condition}
                        </span>
                      </p>
                      <div className="flex gap-6 pt-16">
                        <p className="flex gap-2 text-sm font-semibold ">
                          <img src={red} alt="img" />
                          <span className="text-green-700">
                            {" "}
                            {new Date(data.createdAt).toLocaleDateString()}
                          </span>
                        </p>
                        <p className="flex gap-2 text-sm font-semibold ">
                          <img src={green} alt="img" />
                          <span className="text-green-700">
                            {" "}
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
          >
            {Array.isArray(promo) &&
              promo.map((data, index) => (
                <div
                  key={index}
                  className="gap-2 px-8 py-2 mt-8 cursor-pointer"
                >
                  {" "}
                  {/* Menambahkan padding horizontal */}
                  <img
                    src={data.imageUrl}
                    alt={data.title}
                    className="object-cover w-full h-32 mx-6 rounded-lg"
                  />
                </div>
              ))}
          </Slider>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PromoUser;
