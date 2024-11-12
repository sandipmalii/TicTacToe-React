import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoGameControllerOutline } from "react-icons/io5";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { authContext } from "../context/authContext.jsx";

const Login = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { dispatch } = useContext(authContext);

  useEffect(() => {
    if (location.state?.transition) {
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 800);
    }
  }, [location]);

  const handleSignUp = () => {
    setIsTransitioning(true);
    setTimeout(() => navigate("/signup", { state: { transition: true } }), 400);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/login",
        formData
      );
      if (response.data.status === "success") {
        // Here you might want to store the token in localStorage or context
        const { token, user } = response.data;
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: {
            user: user,
            token: token,
          },
        });

        console.log(response.data, " login data");
        toast.success("Login successful!");
        // Redirect to a protected route or dashboard
        navigate("/home");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during login");
        console.log(error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[600px] relative">
        <div
          className={`absolute inset-0 flex transition-transform duration-800 ease-in-out ${
            isTransitioning ? "-translate-x-1/2" : ""
          }`}
        >
          <div className="w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6">Sign in</h2>
            <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mb-8 shadow-lg transform hover:scale-110 transition-transform duration-300">
              <IoGameControllerOutline className="text-white text-5xl" />
            </div>
            <p className="text-gray-600 mb-8">or use your account</p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="email"
                placeholder="Email / Username"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
              <Link
                to="/forgotpassword"
                className="text-sm text-gray-600 hover:underline block"
              >
                Forgot your password?
              </Link>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 rounded-md hover:from-red-600 hover:to-pink-600 transition duration-300 transform hover:scale-105"
              >
                Login
              </button>
            </form>
          </div>
          <div className="w-1/2 bg-red-500 p-8 md:p-12 text-white flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold mb-6">Hello, Friend!</h2>
            <p className="text-center mb-8">
              Enter your personal details and start journey with us
            </p>
            <button
              onClick={handleSignUp}
              className="border-2 border-white px-8 py-2 rounded-full hover:bg-white hover:text-red-500 transition-all duration-300 transform hover:scale-105"
            >
              SIGN UP
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
