import React, { useState } from "react";
import Index from "../../Component/Element/Input/Index";
import Button from "../../Component/Element/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import eye from "../../assets/icon/Eye-2.png";
import eyeOff from "../../assets/icon/EyeOff-2.png";
import useUpload from "../../hooks/useUpload";
import iconSukses from "../../assets/icon/sukses.png";
import iconGagal from "../../assets/icon/gagal.png";
import icon from "../../assets/icon/x.png";

const Register = () => {
  const { auth } = useAuth();
  const navigate = useNavigate();
  const { upload } = useUpload();

  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    passwordRepeat: "",
    role: "",
    phoneNumber: "",
  });

  const [profilePictureUrl, setProfilePictureUrl] = useState("");
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [popup, setPopup] = useState(false);
  const [passwordError, setPasswordError] = useState("");
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));

    if (name === "passwordRepeat") {
      if (value && formData.password !== value) {
        setPasswordError("Passwords do not match.");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      setMessage("File harus berupa gambar.");
      setTimeout(() => setMessage(null), 3000);
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await upload("upload-image", formData);
      setProfilePictureUrl(res.data.url);
      setMessage(null);
    } catch (err) {
      setProfilePictureUrl("");
      setMessage("Gagal mengunggah gambar.");
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (formData.password !== formData.passwordRepeat) {
      setPasswordError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const userData = {
      email: formData.email,
      name: formData.name,
      password: formData.password,
      passwordRepeat: formData.passwordRepeat,
      role: formData.role,
      profilePictureUrl: profilePictureUrl,
      phoneNumber: formData.phoneNumber,
    };

    try {
      const res = await auth("register", userData);

      if (res.status === 200) {
        setResponse(res.data);
        setError(null);
        setPopup(true);

        setTimeout(() => navigate("/login"), 2000);
      } else {
        setError(res.response ? res.response.data.message : res.message);
        setPopup(true);
      }
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
      setPopup(true);
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setPopup(false);
    setResponse(null);
    setError(null);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center w-full min-h-screen mt-10 bg-white">
      <form
        onSubmit={handleSubmit}
        className="w-full p-6 mb-20 mr-10 bg-white shadow-2xl rounded-xl"
      >
        <h1 className="mb-10 text-2xl font-bold text-center text-green-800">
          Sign Up
        </h1>
        <div className="grid grid-cols-1 gap-10 mb-2 md:grid-cols-2">
          <div className="relative">
            <Index
              deskripsi="Email"
              className="w-full"
              type="email"
              placeholder="Input Email"
              name="email"
              value={formData.email || ""}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative">
            <Index
              deskripsi="Name"
              className="w-full"
              type="text"
              value={formData.name || ""}
              placeholder="Input Full Name"
              name="name"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-10 mb-2 md:grid-cols-2">
          <div className="relative">
            <Index
              deskripsi="Input Password"
              className="w-full"
              type={showPassword ? "text" : "password"}
              value={formData.password || ""}
              placeholder="******"
              name="password"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute bg-transparent right-2 top-10"
            >
              <img
                src={showPassword ? eyeOff : eye}
                alt="Toggle password visibility"
                className="w-5 h-5"
              />
            </button>
          </div>
          <div className="relative">
            <Index
              deskripsi="Confirm Password"
              className="w-full"
              type={showPassword ? "text" : "password"}
              value={formData.passwordRepeat || ""}
              placeholder="******"
              name="passwordRepeat"
              onChange={handleChange}
              required
            />
            <button
              type="button"
              onClick={toggleShowPassword}
              className="absolute bg-transparent right-2 top-10"
            >
              <img
                src={showPassword ? eyeOff : eye}
                alt="Toggle password visibility"
                className="w-5 h-5"
              />
            </button>
            {passwordError && <p className="text-red-600">{passwordError}</p>}
          </div>
        </div>

        <div className="flex gap-10 mb-4">
          <div className="flex-1">
            <label className="block mb-2 text-sm font-medium text-green-600">Role</label>
            <select
              name="role"
              value={formData.role || ""}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
              required
            >
              <option value="" disabled>
                Select role
              </option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </select>
          </div>
          <div className="flex-1">
            <Index
              deskripsi="Phone Number"
              type="text"
              value={formData.phoneNumber || ""}
              placeholder="Input Phone Number"
              name="phoneNumber"
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <label className="block mb-2 text-sm font-medium text-green-600">
          Profile Picture
        </label>
        <div className="flex gap-4 mb-6">
          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleUpload}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
          />
          {profilePictureUrl && (
            <div>
              <img
                src={profilePictureUrl}
                alt="Profile Picture Preview"
                className="object-cover w-48 h-24 rounded"
              />
            </div>
          )}
          {message && <div className="mt-2 text-red-600">{message}</div>}
        </div>

        <div className="mb-3 text-center">
          <Button text="Submit">{loading ? "Loading..." : "Register"}</Button>
        </div>
        <p className="mb-4 text-center">
          Have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
      {popup && (
        <div className="fixed z-50 flex justify-center w-full transform -translate-x-1/2 top-4 left-1/2">
          <div className="relative p-4 bg-white rounded-lg shadow-lg">
            {response ? (
              <div className="flex items-center gap-2">
                <img src={iconSukses} alt="sukses" className="w-6 h-6" />
                <h2 className="text-green-600">Registration Successful</h2>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <img src={iconGagal} alt="gagal" className="w-6 h-6" />
                <h2 className="text-red-600">Registration Failed</h2>
                <p>{error}</p>
                <button
                  onClick={closePopup}
                  className="absolute mt-1 text-gray-600 -top-4 -right-3 hover:text-gray-800 focus:outline-none"
                >
                  <img src={icon} alt="close" className="w-6 h-6" />
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
