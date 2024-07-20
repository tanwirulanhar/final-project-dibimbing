import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Index from "../../Component/Element/Input/Index";
import Button from "../../Component/Element/Button/Button";
import { Link } from "react-router-dom";
import axios from "axios";
import iconSukses from "../../assets/icon/sukses.png";
import iconGagal from "../../assets/icon/gagal.png";
import icon from "../../assets/icon/x.png";

const Login = () => {
  const navigate = useNavigate(); // Untuk navigasi

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [popup, setPopup] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      console.log("Sending request with data:", formData);
      const res = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login",
        formData,
        {
          headers: { apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c" },
        }
      );
      console.log("Received response:", res.data);

      // Check if the response structure is as expected
      setResponse(res.data.data);
      setError(null);
      localStorage.setItem("token", res.data.token); // Simpan token di localStorage
      localStorage.setItem("userData", JSON.stringify(res.data.data)); // Simpan data pengguna di localStorage
      setPopup(true);

      setTimeout(() => {
        navigate("/homepageadmin/alluser");
      }, 2000);

      console.log("Token:", res.data.token);
      console.log("User Data:", res.data.data);
    } catch (err) {
      setError(err.response ? err.response.data.message : err.message);
      setPopup(true); // Pastikan popup diatur ke true saat terjadi kesalahan
    } finally {
      setLoading(false);
    }
  };

  const closePopup = () => {
    setPopup(false);
    setResponse(null);
    setError(null);
  };

  return (
    <div className="relative p-10 mt-20 shadow-2xl w-419 mr-44 h-400 rounded-xl">
      <form action="" onSubmit={handleSubmit}>
        <h1 className="text-2xl font-bold text-center text-green-800 mb-14">
          Sign In
        </h1>
        <Index
          deskripsi="Email"
          type="email"
          placeholder="example@gmail.com"
          value={formData.email}
          onChange={handleChange}
          name="email"
          required
        />
        <Index
          deskripsi="Password"
          type="password"
          value={formData.password}
          placeholder="******"
          onChange={handleChange}
          name="password"
          required
        />

        <p className="mb-4 text-center">
          Don't have an account?{" "}
          <Link to="/register" className="text-green-600">
            Register
          </Link>
        </p>

        <Button
          text="Login"
          className="w-full mb-4"
          type="submit"
          disabled={loading}
        >
          {loading ? "Loading..." : "Login"}
        </Button>

        {popup && (
          <div className="fixed z-50 flex justify-center w-full transform -translate-x-1/2 top-4 left-1/2">
            <div className="relative p-4 bg-white rounded-lg shadow-lg">
              {response ? (
                <div className="flex items-center gap-2">
                  <img src={iconSukses} alt="sukses" className="w-6 h-6" />
                  <h2 className="text-green-600">Login Successful</h2>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <img src={iconGagal} alt="gagal" className="w-6 h-6" />
                  <h2 className="text-red-600">Login Failed</h2>
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
      </form>
    </div>
  );
};

export default Login;
