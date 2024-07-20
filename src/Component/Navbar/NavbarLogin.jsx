import React, { useEffect, useState } from "react";
import axios from "axios";
import logo from "../../assets/logo-baru.png";
import NavlistAdmin from "../Element/Navlist/NavlistAdmin";

const NavbarLogin = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error('No token found');
        }
        const response = await axios.get('https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user', {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: '24405e01-fbc1-45a5-9f5a-be13afcd757c'
          }
        });
        setUserData(response.data.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <div className="sticky top-0 z-50 h-32 bg-white shadow-lg  bg-opacity-80">
      <div className="container flex items-center justify-between px-4 py-2 mx-auto">
        <img className="w-36 md:w-40" src={logo} alt="logo" />

        <div className="items-center hidden space-x-6 md:flex">
          <NavlistAdmin/>
        </div>

        {userData && (
          <div className="flex items-center space-x-4">
            {userData.profilePictureUrl && (
              <img
                src={userData.profilePictureUrl}
                alt="Profile"
                className="w-10 h-10 rounded-full"
              />
            )}
            <div>
            <span className="font-medium">{userData.name}</span>
            <p>{userData.role}</p>
            </div>
         
          </div>
        )}
      </div>
    </div>
  );
};

export default NavbarLogin;
