import React from "react";
import iconSukses from "../../../assets/icon/sukses.png";
import iconGagal from "../../../assets/icon/gagal.png";
import icon from "../../../assets/icon/x-2.png";

const PopupDashboard = ({ type, message, onClose }) => {
  const isSuccess = type === "success";

  const displayMessage = message ? message : (isSuccess ? "Action successful!" : "Action failed!");

  return (
    <div className="fixed z-50 flex justify-end w-full transform -translate-x-1/2 top-24 left-1/2">
      <div className="relative p-4 bg-white rounded-lg shadow-lg">
        <div className="flex items-center gap-2">
          <img
            src={isSuccess ? iconSukses : iconGagal}
            alt={isSuccess ? "sukses" : "gagal"}
            className="w-6 h-6"
          />
          <h2 className={isSuccess ? "text-green-600" : "text-red-600"}>
            {displayMessage}
          </h2>
        </div>
        {!isSuccess && (
          <button
            onClick={onClose}
            className="absolute text-gray-600 top-2 right-2 hover:text-gray-800 focus:outline-none"
          >
            <img src={icon} alt="close" className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default PopupDashboard;