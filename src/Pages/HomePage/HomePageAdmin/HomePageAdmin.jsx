import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardBackground from "../../../Component/DashboardBackground/DashboardBackground";
import Footer from "../../../Component/Footer/Footer";
import Sidebar from "../../../Component/Fragments/Sidebar/Sidebar";
import Navbar from "../../../Component/Navbar/Navbar";
import kiri from "../../../assets/icon/kiri.png";
import kanan from "../../../assets/icon/kanan.png";

const HomePageAdmin = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const handleSidebarClick = (menu) => {
    setActiveMenu(menu);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="relative overflow-hidden">
      <Navbar />
      <div className="h-auto mb-36">
        <button
          onClick={toggleSidebar}
          className="fixed z-50 p-2 mt-20 bg-white rounded-full shadow-2xl top-4 left-4"
        >
          <img
            src={isSidebarVisible ? kiri : kanan}
            alt={isSidebarVisible ? "Close Sidebar" : "Open Sidebar"}
            className="w-8 h-8 "
          />
        </button>
        <div className="flex w-full h-screen bg-white">
          <Sidebar
            onMenuClick={handleSidebarClick}
            activeMenu={activeMenu}
            isVisible={isSidebarVisible}
          />
          <div className="relative flex-1 transition-all duration-300">
            <DashboardBackground />
            <div className="p-4">
              <Outlet />
            </div>
          </div>
        </div>
      </div>

      <div className="">
        <Footer />
      </div>
    </div>
  );
};

export default HomePageAdmin;
