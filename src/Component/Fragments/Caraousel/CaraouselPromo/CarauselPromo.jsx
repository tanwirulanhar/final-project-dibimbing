import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import useGetData from "../../../../hooks/useGatedata";
import promoIcon from "../../../../assets/icon/promo.png";
import Button from "../../../Element/Button/Button";
import { useNavigate } from 'react-router-dom';

const CarouselPromo = () => {
  const { getData } = useGetData();
  const [promos, setPromos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPromos = async () => {
      const res = await getData("promos");
      if (res && res.data) {
        setPromos(res.data.data);
      }
    };

    fetchPromos();
  }, [getData]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    centerMode: false,
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
  
  const handleNavigate = () => {
    navigate('/promoUser');
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(price);
  };

  return (
    <div className="h-auto px-4 pb-8 mx-auto rounded-lg lg:px-8 carousel-promo lg:-top-52">
      <div className="relative p-4 mb-8 text-center lg:p-6">
        <h1 className="relative pb-4 text-2xl font-bold text-green-900 lg:text-3xl">
          Limited-Time Offers on Top Destinations
          <img
            src={promoIcon}
            alt="Promo Icon"
           className="absolute hidden w-6 h-6 mt-2 mr-4 lg:block -top-4 right-1/2 lg:right-96"
          />
        </h1>
        <p className="text-xl font-normal text-green-600 lg:text-2xl">
          Unlock special savings on top destinations. Book now and start your
          adventure!
        </p>
      </div>

      <Slider {...settings}>
        {promos.map((promo) => (
          <div key={promo.id} className="relative px-2 cursor-pointer">
            <div className="relative overflow-hidden transition-transform duration-300 transform bg-gray-200 rounded-lg hover:scale-105">
              <img
                src={promo.imageUrl}
                alt={promo.title}
                className="object-cover w-full h-48 rounded-lg lg:h-64"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white bg-black bg-opacity-50 rounded-lg">
                <h3 className="mb-2 text-sm font-bold lg:text-lg">{promo.title}</h3>
                <p className="text-xs font-bold text-white lg:text-sm">
                  Promo &nbsp;&nbsp;
                  <s className="text-green-400">
                    {formatPrice(promo.promo_discount_price)}
                  </s>
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
      <div className="flex items-center justify-center mt-12">
        <Button onClick={handleNavigate} text="See All Promo" className="w-3/4 lg:w-1/4" />
      </div>
    </div>
  );
};

export default CarouselPromo;
