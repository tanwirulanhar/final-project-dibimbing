import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = ({  onMenuClick, activeMenu }) => {
  const menuItems = [
    { label: 'User', path: '/homepageadmin/alluser', value: 'User' },
    { label: 'Promo', path: '/homepageadmin/promo', value: 'Promo ' },
    { label: 'Banner', path: '/homepageadmin/banner', value: 'Banner ' },
    { label: 'Category', path: '/homepageadmin/category', value: 'Category ' },
    { label: 'Activity', path: '/homepageadmin/activity', value: 'Activity ' },
  ];

  return (
    <div
      className="relative z-10 flex flex-col w-64 m-6 mt-10 ml-24 text-green-500 shadow-lg bg-slate-100 h-634 rounded-2xl"
      
    >
      <nav className="flex-1 p-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.value} className="mb-4">
              <Link
                to={item.path}
                onClick={() => onMenuClick(item.value)}
                className={`flex items-center p-3 font-semibold rounded-lg transition-colors duration-300 ${
                  activeMenu === item.value ? 'bg-green-500 text-white' : 'hover:bg-green-500 hover:text-white'
                }`}
              >
                <span className="ml-3">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;
