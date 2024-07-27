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
    <div className="h-auto px-8 py-8 mx-auto bg-white rounded-lg carousel-promo">
      
      <div className="relative p-6 mb-8 text-center">
        <h1 className="relative pb-4 text-3xl font-bold text-green-900">
          Limited-Time Offers on Top Destinations
          <img
            src={promoIcon}
            alt="Promo Icon"
            className="absolute w-6 h-6 mt-2 mr-4 -top-4 right-96 "
          />
        </h1>
        <p className="text-2xl font-normal text-green-600">
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
                className="object-cover w-full h-64 rounded-lg"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white bg-black bg-opacity-50 rounded-lg">
                <h3 className="mb-2 text-lg font-bold">{promo.title}</h3>

                <p className="text-sm font-bold text-white ">
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
      <div className="flex items-center justify-center mt-12 ">
        
        <Button onClick={handleNavigate} text="See All Promo" className="w-1/4" />
      </div>
    </div>
  );
};

export default CarouselPromo;
