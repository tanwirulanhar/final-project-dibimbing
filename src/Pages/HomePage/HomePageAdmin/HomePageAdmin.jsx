import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import DashboardBackground from "../../../Component/DashboardBackground/DashboardBackground";
import Footer from "../../../Component/Footer/Footer";
import Sidebar from "../../../Component/Fragments/Sidebar/Sidebar";
import Navbar from "../../../Component/Navbar/Navbar";

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
        <div className="flex w-full bg-white h-360">
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
      </div>

      <Footer />
    </div>
  );
};

export default HomePageAdmin;
