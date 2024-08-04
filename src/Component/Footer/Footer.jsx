import React from "react";
import logo from "../../assets/logo-baru.png";
import facebook from "../../assets/icon/facebook.png";
import instagram from "../../assets/icon/Instagram.png";
import twitter from "../../assets/icon/Twitter.png";
import youtube from "../../assets/icon/Youtube.png";

const Footer = () => {
  return (
    <div className="relative z-10 flex flex-col items-center justify-between h-auto text-white bg-zinc-800 lg:flex-row">
      <div className="pt-16 mb-4 text-center lg:text-left lg:ml-24">
        <img src={logo} alt="logo" className="h-20 mx-auto w-26 lg:mx-0 md:w-28 lg:w-28 lg:h-22" />
        <p className="mt-2 text-base font-normal w-80 lg:w-96">
          Every journey is a new story. Create your own adventure and live
          experiences that will stay with you forever.
        </p>
        <div className="flex justify-center gap-4 mt-8 cursor-pointer lg:justify-start pb-14">
          <img src={facebook} alt="facebook" className="w-6 h-6 md:w-8 md:h-8" />
          <img src={instagram} alt="instagram" className="w-6 h-6 md:w-8 md:h-8" />
          <img src={twitter} alt="twitter" className="w-6 h-6 md:w-8 md:h-8" />
          <img src={youtube} alt="youtube" className="w-6 h-6 md:w-8 md:h-8" />
        </div>
      </div>

      <div className="mb-8 text-base font-normal text-center cursor-pointer lg:text-left lg:mb-2">
        <h1 className="mb-4 text-xl font-semibold cursor-auto">Link</h1>
        <p>Home</p>
        <p>Activity</p>
        <p>Promo</p>
      </div>

      <div className="mb-8 text-base font-normal text-center lg:text-left lg:mb-2 lg:w-60 lg:mr-44">
        <h1 className="mb-4 text-xl font-semibold">Contact US</h1>
        <p>Indonesia,</p>
        <p className="mx-auto w-60 lg:mx-0">
          Jl. Planet Namek No. 123, Lombok <br />
          Telp: 081234567890 <br />
          Email: vegeta@dragonball.com
        </p>
      </div>
    </div>
  );
};

export default Footer;
