import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Index from "../../Component/Element/Input/Index";
import Button from "../../Component/Element/Button/Button";
import { Link } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import Popup from "../../Component/Element/Popup/Popup";

const Login = () => {
  const navigate = useNavigate();
  const { auth } = useAuth();

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
      const res = await auth("login", formData);
      if (res.status === 200) {
        const userData = res.data.data;
        setResponse(userData);
        setError(null);
        localStorage.setItem("userData", JSON.stringify(userData));
        setPopup(true);

        setTimeout(() => {
          if (userData.role === "admin") {
            navigate("/homepageadmin/alluser");
          } else {
            navigate("/");
          }
        }, 2000);
      } else {
        setError(res.response ? res.response.data.message : res.message);
        setPopup(true);
      }
    } catch (err) {
      setError(err.message);
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

  return (
    <div className="relative z-40 w-full max-w-md p-6 mx-auto mt-10 text-green-500 bg-white shadow-2xl md:p-10 md:mt-20 md:max-w-lg rounded-xl">
      <form onSubmit={handleSubmit}>
        <h1 className="mb-8 text-xl font-bold text-center text-green-800 md:text-2xl md:mb-14">
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

        <p className="mb-4 text-sm text-center text-green-600 md:text-base">
          Don't have an account?{" "}
          <Link to="/register" className="font-semibold text-green-600">
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
          <Popup
            type={response ? "success" : "error"}
            message={error || (response ? "Login Successful" : "Login Failed")}
            onClose={closePopup}
          />
        )}
      </form>
    </div>
  );
};

export default Login;
