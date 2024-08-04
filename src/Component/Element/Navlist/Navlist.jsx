import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navlist = ({ userRole }) => {
  const location = useLocation();
  const activePath = location.pathname;

  const navItems =
    userRole === "admin"
      ? [
          { name: "Home", path: "/" },
          { name: "Promo", path: "/promoUser" },
          { name: "Activity", path: "/activityUser" },
          { name: "Dashboard", path: "/homepageadmin/alluser" },
        ]
      : [
          { name: "Home", path: "/" },
          { name: "Promo", path: "/promoUser" },
          { name: "Activity", path: "/activityUser" },
        ];

  return (
    <>
      {navItems.map((item) => (
        <Link
          key={item.name}
          to={item.path}
          className={`text-lg font-bold text-green-600 transition-all duration-200 cursor-pointer ${
            activePath === item.path
              ? "border-b-2 border-green-600"
              : "hover:-translate-y-1 hover:scale-110 hover:border-b-2 hover:border-green-600"
          }`}
        >
          {item.name}
        </Link>
      ))}
    </>
  );
};

export default Navlist;
