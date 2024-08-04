import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardBackground from "../../../Component/DashboardBackground/DashboardBackground";
import Footer from "../../../Component/Footer/Footer";
import Sidebar from "../../../Component/Fragments/Sidebar/Sidebar";
import Navbar from "../../../Component/Navbar/Navbar";
import { useSelector } from "react-redux";

const HomePageAdmin = () => {
  const [activeMenu, setActiveMenu] = useState("");
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  const darkMode = useSelector((state) => state.darkMode);

  const handleSidebarClick = (menu) => {
    setActiveMenu(menu);
  };

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div
      className={`overflow-x-hidden ${
        darkMode ? "bg-gray-900 text-green-800 " : "bg-white "
      }`}
    >
      <div className="relative overflow-hidden">
        <Navbar />
        <div className="flex w-full h-auto mb-36">
          <Sidebar
            onMenuClick={handleSidebarClick}
            activeMenu={activeMenu}
            isVisible={isSidebarVisible}
            toggleSidebar={toggleSidebar}
          />
          <div className="relative flex-1 transition-all duration-300">
            <DashboardBackground />
            <div className="p-4">
              <Outlet />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default HomePageAdmin;
