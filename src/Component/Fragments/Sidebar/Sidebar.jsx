import React, { useState } from "react";
import { Link } from "react-router-dom";
import kiri from "../../../assets/icon/kiri.png";
import kanan from "../../../assets/icon/kanan.png";
import user from "../../../assets/icon/User.png";
import percent2 from "../../../assets/icon/percent2.png";
import banner from "../../../assets/icon/Banner.png";
import gambar from "../../../assets/icon/gambar.png";
import activity from "../../../assets/icon/activity.png";

const Sidebar = ({ onMenuClick, activeMenu, isVisible, toggleSidebar }) => {
  const menuItems = [
    { label: "User", path: "/homepageadmin/alluser", value: "User", img: user },
    { label: "Promo", path: "/homepageadmin/promo", value: "Promo", img: percent2 },
    { label: "Banner", path: "/homepageadmin/banner", value: "Banner", img: gambar },
    { label: "Category", path: "/homepageadmin/category", value: "Category", img: banner },
    { label: "Activity", path: "/homepageadmin/activity", value: "Activity", img: activity },
  ];

  return (
    <div
      className={`bg-[rgb(55,139,55)] absolute inset-y-0 left-0 z-30 w-52 mt-40 mb-32 shadow-xl h-400 transition-transform duration-300  rounded-r-2xl ${
        isVisible ? "translate-x-0" : "-translate-x-full"
      }`}
    >
      <button
        onClick={toggleSidebar}
        className="absolute z-50 p-2 -mt-8  bg-white rounded-full shadow-2xl top-4 right-[-30px]"
      >
        <img
          src={isVisible ? kiri : kanan}
          alt={isVisible ? "Close Sidebar" : "Open Sidebar"}
          className="w-8 h-8"
        />
      </button>
      <nav className="flex-1 py-4 pr-4 text-lg text-green-100">
        <ul>
          {menuItems.map((item) => (
            <li key={item.value} className="py-2">
              <Link
                to={item.path}
                onClick={() => onMenuClick(item.value)}
                className={`flex items-center p-3 font-semibold rounded-r-lg transition-colors duration-300 ${
                  activeMenu === item.value
                    ? "bg-green-900 text-white"
                    : "hover:bg-green-800 hover:text-white"
                }`}
              >
                <div className="flex justify-between w-full">
                  <span className="ml-3">{item.label}</span>
                  <img className="w-5 h-5 mt-1" src={item.img} alt="img" />
                </div>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
