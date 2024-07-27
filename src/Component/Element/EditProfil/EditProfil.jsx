import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Button from "../Button/Button";
import Popup from "../Popup/Popup";
import DashboardBackground from "../../DashboardBackground/DashboardBackground";

const EditProfile = () => {
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    profilePictureUrl: "",
    role: "", // Tambahkan state untuk menyimpan peran pengguna
  });
  const [newProfilePicture, setNewProfilePicture] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("success");
  const navigate = useNavigate();

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
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevUserData) => ({
      ...prevUserData,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    setNewProfilePicture(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      if (!token) return;

      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("email", userData.email);
      if (newProfilePicture) {
        formData.append("profilePicture", newProfilePicture);
      }

      await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setPopupType("success");
      setPopupMessage("Profile updated successfully!");
      setShowPopup(true);

      setTimeout(() => {
        setShowPopup(false);
        if (userData.role === "admin") {
          navigate("/homepageadmin/alluser"); // Rute halaman admin
        } else {
          navigate("/"); // Rute halaman user
        }
      }, 2000);
    } catch (error) {
      console.error("Error updating profile:", error);
      setPopupType("error");
      setPopupMessage("Failed to update profile.");
      setShowPopup(true);
    }
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  const handleCancel = () => {
    if (userData.role === "admin") {
      navigate("/homepageadmin/alluser"); // Rute halaman admin
    } else {
      navigate("/"); // Rute halaman user
    }
  };

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-gray-100">
      <DashboardBackground className="absolute inset-0 w-full h-full" />{" "}
      {/* Tambahkan className untuk gaya CSS */}
      <div className="relative z-10 w-full max-w-lg p-8 bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-3xl font-semibold text-center text-green-800">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-green-500">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-500">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={userData.email}
              onChange={handleInputChange}
              className="block w-full px-3 py-2 mt-1 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-green-500">
              Profile Picture
            </label>
            <input
              type="file"
              name="profilePicture"
              onChange={handleFileChange}
              className="block w-full mt-1 text-sm text-gray-500"
            />
            {userData.profilePictureUrl && (
              <img
                src={userData.profilePictureUrl}
                alt="Profile"
                className="w-24 h-24 mx-auto mt-4 rounded-full"
              />
            )}
          </div>
          <div className="flex justify-center space-x-4">
            <Button text="Cancel" type="button" onClick={handleCancel} />
            <Button text="Save Changes" type="submit" />
          </div>
        </form>
      </div>
      {showPopup && (
        <Popup type={popupType} message={popupMessage} onClose={closePopup} />
      )}
    </div>
  );
};

export default EditProfile;
