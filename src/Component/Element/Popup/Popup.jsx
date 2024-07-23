import React from "react";
import iconSukses from "../../../assets/icon/sukses.png";
import iconGagal from "../../../assets/icon/gagal.png";
import icon from "../../../assets/icon/x-2.png";

const Popup = ({ type, message, onClose }) => {
  const isSuccess = type === "success";

  const displayMessage = message ? message : (isSuccess ? "Action successful!" : "Action failed!");

  return (
    <div className="fixed z-50 flex justify-center w-full transform -translate-x-1/2 top-4 left-1/2">
      <div className="relative p-4 bg-white rounded-lg shadow-lg">
        <div className="flex items-center gap-2">
          <img
            src={isSuccess ? iconSukses : iconGagal}
            alt={isSuccess ? "sukses" : "gagal"}
            className="w-4 h-4"
          />
          <h2 className={isSuccess ? "text-green-600" : "text-red-600"}>
            {displayMessage}
          </h2>
        </div>
        {!isSuccess && (
          <button
            onClick={onClose}
            className="absolute mt-1 -top-3 -right-4 focus:outline-none"
          >
            <img src={icon} alt="close" className="w-6 h-6" />
          </button>
        )}
      </div>
    </div>
  );
};

export default Popup;