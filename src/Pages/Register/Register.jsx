import React, { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Index from "../../Component/Element/Input/Index";
import Button from "../../Component/Element/Button/Button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import eye from "../../assets/icon/Eye-2.png";
import eyeOff from "../../assets/icon/EyeOff-2.png";
import iconSukses from "../../assets/icon/sukses.png";
import iconGagal from "../../assets/icon/gagal.png";
import icon from "../../assets/icon/x.png";

const Register = () => {
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    password: "",
    passwordRepeat: "",
    role: "",
    profilePicture: null,
    phoneNumber: "",
  });

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [popup, setPopup] = useState(false);
  const [passwordError, setPasswordError] = useState(""); // State untuk pesan kesalahan password

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Validasi password saat kolom konfirmasi password diubah
    if (name === "passwordRepeat") {
      if (value && formData.password !== value) {
        setPasswordError("Passwords do not match.");
      } else {
        setPasswordError("");
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Validasi akhir sebelum pengiriman
    if (formData.password !== formData.passwordRepeat) {
      setPasswordError("Passwords do not match.");
      setLoading(false);
      return;
    }

    const formDataToSend = new FormData();
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    try {
      const res = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register",
        formDataToSend,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setResponse(res.data);
      setError(null);
      setPopup(true);

      setTimeout(() => {
        navigate("/login");
      }, 2000);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
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

  const onDrop = useCallback(
    (acceptedFiles) => {
      setFormData({ ...formData, profilePicture: acceptedFiles[0] });
    },
    [formData]
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop, noDrag: true });

  return (
    <div className="flex items-center justify-center min-h-screen bg-white">
      <form
        onSubmit={handleSubmit}
        className="max-w-lg p-6 mt-10 mb-20 bg-white shadow-2xl w-541 rounded-xl"
      >
        <h1 className="mb-10 text-2xl font-bold text-center text-green-800">
          Sign Up
        </h1>
        <div className="grid grid-cols-1 gap-4 mb-2 md:grid-cols-2">
          <div className="relative">
            <Index
              deskripsi="Email"
              className="w-full"
              type="email"
              placeholder="Input Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="relative">
            <Index
              deskripsi="Name"
              className="w-full"
              type="text"
              value={formData.name}
              placeholder="Input Full Name"
              name="name"
              onChange={handleChange}
              required
            />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-4 mb-2 md:grid-cols-2">
          <div className="relative">
            <Index
              deskripsi="Input Password"
              className="w-full"
              type={showPassword ? "text" : "password"}
              value={formData.password}
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
              value={formData.passwordRepeat}
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
            {passwordError && (
              <p className="text-red-600 ">{passwordError}</p> 
            )}
          </div>
        </div>
        <div className="mb-6">
          <label className="block font-bold text-green-900">Role</label>
          <select
            name="role"
            value={formData.role}
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
        <div className="mb-6">
          <label className="block font-bold text-green-900">Profile Picture</label>
          <div
            {...getRootProps()}
            className="flex w-full gap-4 px-3 py-2 border rounded-lg focus:outline-none focus:border-green-500"
          >
            <input {...getInputProps()} />
            <button
              type="button"
              className="py-2 text-white bg-green-500 rounded-lg w-36"
            >
              Choose Image
            </button>
            {formData.profilePicture && (
              <p className="mt-2 text-gray-700">
                {formData.profilePicture.name}
              </p>
            )}
          </div>
        </div>
        <Index
          deskripsi="Phone Number"
          type="text"
          value={formData.phoneNumber}
          placeholder="Input Phone Number"
          name="phoneNumber"
          onChange={handleChange}
          required
        />

        <p className="mb-4 text-center">
          Have an account?{" "}
          <Link to="/login" className="text-green-600">
            Sign In Here
          </Link>
        </p>

        <Button
          text="Sign Up"
          type="submit"
          disabled={loading}
          className="w-full mb-4"
        >
          {loading ? "Loading..." : "Sign Up"}
        </Button>
      </form>
      {popup && (
        <div className="fixed z-50 flex justify-center w-full transform -translate-x-1/2 top-4 left-1/2">
          <div className="relative p-4 bg-white rounded-lg shadow-lg">
            {response ? (
              <div className="flex items-center gap-2">
                <img src={iconSukses} alt="sukses" className="w-6 h-6" />
                <h2 className="text-green-600">Register Successful</h2>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <img src={iconGagal} alt="gagal" className="w-6 h-6" />
                <h2 className="text-red-600">Register Failed</h2>
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
