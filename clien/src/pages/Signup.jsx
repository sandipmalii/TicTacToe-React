import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AiOutlineUserAdd } from "react-icons/ai";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Signup = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (location.state?.transition) {
      setIsTransitioning(true);
      setTimeout(() => setIsTransitioning(false), 800);
    }
  }, [location]);

  const handleSignIn = () => {
    setIsTransitioning(true);
    setTimeout(() => navigate("/login", { state: { transition: true } }), 400);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:8000/api/user/register",
        formData
      );
      if (response.data.status === "success") {
        toast.success(response.data.message);
        // You might want to store the token or redirect the user here
        navigate("/login");
      }
    } catch (error) {
      if (error.response && error.response.data) {
        toast.error(error.response.data.message);
      } else {
        toast.error("An error occurred during registration");
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center overflow-hidden">
      {/* <ToastContainer position="top-right" autoClose={3000} /> */}
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl h-[600px] relative">
        <div
          className={`absolute inset-0 flex transition-transform duration-800 ease-in-out ${
            isTransitioning ? "translate-x-1/2" : ""
          }`}
        >
          <div className="w-1/2 bg-red-500 p-8 md:p-12 text-white flex flex-col justify-center items-center">
            <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
            <p className="text-center mb-8">
              To keep connected with us please login with your personal info
            </p>
            <button
              onClick={handleSignIn}
              className="border-2 border-white px-8 py-2 rounded-full hover:bg-white hover:text-red-500 transition-all duration-300 transform hover:scale-105"
            >
              SIGN IN
            </button>
          </div>
          <div className="w-1/2 bg-white p-8 md:p-12 flex flex-col justify-center">
            <h2 className="text-3xl font-bold mb-6">Create Account</h2>
            <div className="w-24 h-24 bg-gradient-to-br from-red-400 to-pink-500 rounded-full flex items-center justify-center mb-8 shadow-lg transform hover:scale-110 transition-transform duration-300">
              <AiOutlineUserAdd className="text-white text-5xl" />
            </div>
            <p className="text-gray-600 mb-8">
              or use your email for registration
            </p>
            <form className="space-y-4" onSubmit={handleSubmit}>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                className="w-full px-4 py-2 bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email"
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
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 rounded-md hover:from-red-600 hover:to-pink-600 transition duration-300 transform hover:scale-105"
              >
                SIGN UP
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
