import React, { useEffect, useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import Button from "../../Component/Element/Button/Button";
import logo from "../../assets/logo-baru.png";
import Navlist from "../Element/Navlist/Navlist";
import tandaBawah from "../../assets/icon/tanda-bawah.png";
import DropdownMenu from "../Element/DropdownMenu/DropdownMenu";
import { toggleDarkMode } from "../../redux/Action/darkModeAction";
import sun from "../../assets/icon/Sun.png";
import bulan from "../../assets/icon/bulan.png";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const darkMode = useSelector((state) => state.darkMode);

  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("userData")) || null
  );
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;
        const response = await axios.get(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );
        setUserData(response.data.data);
        localStorage.setItem("userData", JSON.stringify(response.data.data));
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    if (!userData) {
      fetchUserData();
    }
  }, [userData]);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > lastScrollY) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const handleLogoClick = () => {
    if (userData?.role === "admin") {
      navigate("/homepageadmin/alluser");
    } else {
      navigate("/");
    }
  };

  const toggleDropdown = () => {
    setDropdownVisible(!dropdownVisible);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
    console.log("Menu Open:", !menuOpen);
  };

  const handleToggleDarkMode = () => {
    dispatch(toggleDarkMode());
  };

  return (
    <div
      className={`sticky top-0 z-40 p-2 px-4 shadow-lg bg-opacity-80 transition-transform duration-300 h-auto ${
        darkMode ? "bg-gray-900 text-white" : "bg-white"
      } ${
        showNavbar ? "transform translate-y-0" : "transform -translate-y-full"
      }`}
    >
      <div className="container flex items-center justify-between px-4 py-2 mx-auto">
        <img
          className="object-cover h-12 mt-2 cursor-pointer w-28 md:w-32"
          src={logo}
          alt="logo"
          onClick={handleLogoClick}
        />

        <div className="items-center hidden space-x-6 md:flex">
          <Navlist userRole={userData?.role} />
        </div>

        {/* Menu Toggle Button */}
        <div className="justify-end md:hidden">
          <button
            className="text-green-600 focus:outline-none"
            onClick={toggleMenu}
          >
            {menuOpen ? (
              <span>&#10005;</span> 
            ) : (
              <span>&#9776;</span> 
            )}
          </button>
        </div>

        <div className="flex gap-4">
          {/* Dark Mode Toggle Button */}
          <button
            className="ml-4 text-sm font-medium text-gray-700 dark:text-gray-300"
            onClick={handleToggleDarkMode}
          >
            {darkMode ? (
              <img src={sun} alt="Sun" className="w-6 h-6" />
            ) : (
              <img src={bulan} alt="Moon" className="w-6 h-6" />
            )}
          </button>

          {userData ? (
            <div className="relative flex items-center space-x-4">
              {userData.profilePictureUrl ? (
                <img
                  src={userData.profilePictureUrl}
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              ) : (
                <div className="flex items-center justify-center w-8 h-8 text-gray-600 bg-gray-200 rounded-full">
                  <span>{userData.name.charAt(0)}</span>
                </div>
              )}

              <div>
                <span className="font-medium">{userData.name}</span>
                <div className="flex items-center gap-3">
                  <p>{userData.role}</p>
                  <img
                    src={tandaBawah}
                    alt="dropdown"
                    className="w-4 h-4 pt-1 cursor-pointer"
                    onClick={toggleDropdown}
                  />
                </div>
              </div>
              {dropdownVisible && (
                <div ref={dropdownRef}>
                  <DropdownMenu onClose={() => setDropdownVisible(false)} />
                </div>
              )}
            </div>
          ) : (
            <div className="space-x-2 md:flex">
              <Link to="/login">
                <Button text="Sign In" marginClass=" lg:block hidden" />
              </Link>
              <Link to="/register" className="hidden lg:block">
                <Button text="Sign Up" />
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Responsive Menu */}
      {menuOpen && (
        <div className="z-50 flex flex-col items-center pb-4 mt-4 md:hidden">
          <Navlist userRole={userData?.role} />
          {!userData && (
             <Link to="/login">
             <Button text="Sign In" className="w-full mt-4"  />
           </Link>
          )}
         
        </div>
      )}
    </div>
  );
};

export default Navbar;
