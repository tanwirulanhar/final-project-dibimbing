import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import DashboardBackground from '../../Component/DashboardBackground/DashboardBackground';
import Footer from '../../Component/Footer/Footer';
import Sidebar from '../../Component/Fragments/Sidebar/Sidebar';
import NavbarLogin from '../../Component/Navbar/NavbarLogin';

const HomePageAdmin = () => {
  const [activeMenu, setActiveMenu] = useState(''); // State for storing active menu

  // Function to update the active menu
  const handleSidebarClick = (menu) => {
    setActiveMenu(menu);
  };

  return (
    <div className="relative overflow-hidden">
      <NavbarLogin />
      <div className="flex">
        <Sidebar ZIndex={20} onMenuClick={handleSidebarClick} activeMenu={activeMenu} />
        <div className="flex-1">
          <DashboardBackground zIndex={10} />
          <div className="p-6 ">
            <h1 className={`text-3xl text-center text-green-500 rounded-t-2xl shadow-xl mt-4 bg-white mr-32 p-4 font-bold ${activeMenu ? 'text-green-500d' : 'text-green-500'} mb-6 transition-colors duration-300`}>
              {activeMenu || ' Admin Dashboard'}
            </h1>
            <Outlet />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePageAdmin;
