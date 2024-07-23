import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardBackground from '../../../Component/DashboardBackground/DashboardBackground';
import Footer from '../../../Component/Footer/Footer';
import Sidebar from '../../../Component/Fragments/Sidebar/Sidebar';
import Navbar from '../../../Component/Navbar/Navbar';

const HomePageAdmin = () => {
  const [activeMenu, setActiveMenu] = useState(''); 

  const handleSidebarClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div className="relative overflow-hidden">
      <Navbar />
      <div className="flex bg-white">
        <Sidebar onMenuClick={handleSidebarClick} activeMenu={activeMenu} />
        <div className="flex-1 mt-5 mb-40 h-634">
          <DashboardBackground zIndex={10} />
          <div className="p-4 ">
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePageAdmin;
