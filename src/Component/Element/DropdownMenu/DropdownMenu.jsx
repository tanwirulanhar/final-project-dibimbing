import React from 'react';
import { useNavigate } from 'react-router-dom';

const DropdownMenu = ({ onClose }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/login");
    onClose();
    window.location.reload(); 
  };

  const handleEditProfile = () => {
    navigate('/editprofil'); 
    onClose();
  };

  return (
    <div className="absolute right-0 z-50 w-48 py-2 bg-white rounded-md shadow-lg ">
      <button
        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
        onClick={handleEditProfile}
      >
        Edit Profile
      </button>
      <button
        className="block w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100"
        onClick={handleLogout}
      >
        Logout
      </button>
    </div>
  );
};

export default DropdownMenu;
