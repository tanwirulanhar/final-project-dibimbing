import React from "react";
import logo from "../../assets/logo-baru.png";
import facebook from "../../assets/icon/facebook.png";
import instagram from "../../assets/icon/Instagram.png";
import twitter from "../../assets/icon/Twitter.png";
import youtube from "../../assets/icon/Youtube.png";

const Footer = () => {
  return (
    <div className="relative z-40 flex items-center justify-between h-auto text-white bg-zinc-800">
      <div className="pt-16 mb-4 ml-24">
        <img src={logo} alt="logo" className="w-20 h-20 md:w-40" />
        <p className="mt-2 text-base font-normal w-336">
          Every journey is a new story. Create your own adventure and live
          experiences that will stay with you forever.
        </p>
        <div className="flex gap-4 mt-8 cursor-pointer pb-14">
          <img src={facebook} alt="facebook" />
          <img src={instagram} alt="instagram" />
          <img src={twitter} alt="twitter" />
          <img src={youtube} alt="youtube" />
        </div>
      </div>

      <div className="mb-2 text-base font-normal cursor-pointer">
        <h1 className="mb-4 text-xl font-semibold cursor-auto">Link</h1>
        <p>Home</p>
        <p>Activity</p>
        <p>Promo</p>
      </div>

      <div className="mb-2 text-base font-normal w-60 mr-44">
        <h1 className="mb-4 text-xl font-semibold">Contact US</h1>
        <p>Indonesia,</p>
        <p className="w-60">
          Jl. Planet Namek No. 123, Lombok Telp : 081234567890 Email
          : vegeta@dragonball.com
        </p>
      </div>
    </div>
  );
};

export default Footer;
