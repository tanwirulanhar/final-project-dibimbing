import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import useGetData from "../../../../hooks/useGatedata";
import styled from "styled-components";
import Button from "../../../Element/Button/Button";
import Location from "../../../../assets/icon/Location.png";
import { Link } from "react-router-dom";

const StyledSlider = styled(Slider)`
  .slick-slide {
    transition: transform 0.5s ease, filter 0.5s ease;
    padding: 0 6px;
    filter: brightness(0.8);/
  }

  .slick-center .carousel-item {
    transform: scale(1.2); 
    filter: brightness(0.8); 
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3); 
  }

  .carousel-item {
    position: relative; 
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden; 
    border-radius: 0.5rem; 
    transition: transform 0.5s ease, filter 0.5s ease;
  }

  .carousel-image {
    object-fit: cover;
    width: 100%;
    height: 250px;
    transition: transform 0.5s ease; 
  }

  .slick-slide:not(.slick-center) .carousel-image {
    transform: scale(0.8); 
  }

  .carousel-text {
    transition: transform 0.5s ease; 
    transform: scale(1);
  }

  .slick-center .carousel-text {
    transform: scale(1.2); 
  }
`;

const CarouselCategory = () => {
  const { getData } = useGetData();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await getData("activities");
      if (res && res.data) {
        setCategories(res.data.data);
      }
    };

    fetchCategory();
  }, [getData]);

  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "10px",
    slidesToShow: 3,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="h-auto px-8 py-8 mx-20 mt-10 bg-green-800 rounded-lg bg-opacity-10 carousel-category ">
      <div className="relative p-6 mb-8 text-center">
        <div className="flex justify-center gap-2">
          <img src={Location} alt="img" className="w-8 h-8" />
          <h1 className="relative pb-4 text-3xl font-bold text-green-900">
            Choose Your Dream Destination
          </h1>
        </div>

        <p className="text-2xl font-normal text-green-600">
          Explore a wide range of categories and find your perfect getaway. Book
          now and embark on your adventure!
        </p>
      </div>

      <StyledSlider {...settings}>
        {categories.map((category) => (
          <div key={category.id} className="relative cursor-pointer">
            <div className="relative carousel-item hover:scale-105">
            {category.imageUrls && category.imageUrls.length > 0 && (
                <img
                  src={category.imageUrls[0]} 
                  alt={category.title}
                  className="carousel-image"
                />
              )}

              <div className="absolute inset-0 flex items-center justify-center rounded-lg">
                <div className="text-center text-white">
                  <h3 className="mb-2 text-lg font-bold carousel-text">
                    {category.title}
                  </h3>
                  <p className="text-xl font-bold carousel-text">
                    {category.name}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </StyledSlider>
      <Link to={"/activityUser"}>
        <div className="flex items-center justify-center mt-12 ">
          <Button text="See All Activities" className="w-1/4" />
        </div>
      </Link>
    </div>
  );
};

export default CarouselCategory;
