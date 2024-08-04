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
    <div className="flex items-center justify-center w-full h-full p-4 ">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md p-6 bg-white shadow-lg rounded-xl"
      >
        <h1 className="mb-8 text-2xl font-bold text-center text-green-800">
          Sign Up
        </h1>
        <div className="grid grid-cols-1 gap-6 mb-4 text-green-500 md:grid-cols-2">
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
        <div className="grid grid-cols-1 gap-6 mb-4 text-green-500 md:grid-cols-2">
          <div className="relative grid items-center">
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
              className="absolute flex items-center transform -translate-y-1/2 right-2 top-1/2"
            >
              <img
                src={showPassword ? eyeOff : eye}
                alt="Toggle password visibility"
                className="w-5 h-5"
              />
            </button>
          </div>

          <div className="relative grid items-center">
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
              className="absolute transform -translate-y-1/2 right-3 top-1/2"
            >
              <img
                src={showPassword ? eyeOff : eye}
                alt="Toggle password visibility"
                className="w-5 h-5"
              />
            </button>
            {passwordError && (
              <p className="mt-2 text-sm text-red-600">{passwordError}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 mb-4 text-green-600 md:grid-cols-2">
          <div>
            <label className="block mb-2 text-sm font-medium text-green-600">
              Role
            </label>
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
          <div>
            <Index
              deskripsi="Phone Number"
              type="number"
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
        <div className="flex flex-col gap-4 mb-6">
          <input
            type="file"
            name="profilePicture"
            accept="image/*"
            onChange={handleUpload}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
          />
          {profilePictureUrl && (
            <div className="flex justify-center">
              <img
                src={profilePictureUrl}
                alt="Profile Picture Preview"
                className="object-cover w-48 h-24 rounded"
              />
            </div>
          )}
          {message && <div className="text-center text-red-600">{message}</div>}
        </div>

        <div className="mb-4 text-center">
          <Button text="Submit" className="w-full">
            {loading ? "Loading..." : "Register"}
          </Button>
        </div>
        <p className="text-center text-green-500">
          Have an account?{" "}
          <Link to="/login" className="text-green-600 hover:underline">
            Login
          </Link>
        </p>
      </form>
      {popup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <div className="relative p-4 bg-white rounded-lg shadow-lg">
            {response ? (
              <>
                <img
                  src={iconSukses}
                  alt="Success"
                  className="w-12 h-12 mx-auto mb-4"
                />
                <p className="text-center text-green-700">{response.message}</p>
              </>
            ) : (
              <>
                <img
                  src={iconGagal}
                  alt="Error"
                  className="w-12 h-12 mx-auto mb-4"
                />
                <p className="text-center text-red-700">{error}</p>
              </>
            )}
            <button
              onClick={closePopup}
              className="absolute p-1 text-gray-500 top-2 right-2"
            >
              <img src={icon} alt="Close" className="w-6 h-6" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
