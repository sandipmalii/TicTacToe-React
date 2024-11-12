import React, { useState } from "react";
import { Link } from "react-router-dom";
const ForgotPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  // const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    // Functionality remains the same
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br bg-gray-900">
      <div className="max-w-md w-full mx-4">
        <div className="bg-black bg-opacity-50 rounded-lg shadow-2xl overflow-hidden backdrop-filter backdrop-blur-lg">
          <div className="px-8 py-10">
            <div className="text-center mb-8">
              <h2 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                Reset Password
              </h2>
              <p className="mt-2 text-sm text-gray-300">
                Enter your new password to reclaim your account
              </p>
            </div>
            <form onSubmit={handleSubmit} className="space-y-5">
              {/* <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                  placeholder="Enter your new password"
                />
              </div> */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="text-sm font-medium text-gray-300"
                >
                  New Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                  placeholder="Enter your new password"
                />
              </div>
              <div className="space-y-2">
                <label
                  htmlFor="confirmPassword"
                  className="text-sm font-medium text-gray-300"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                  className="w-full px-4 py-3 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 transition duration-200"
                  placeholder="Confirm your new password"
                />
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-200 transform hover:scale-105"
                >
                  Reset Password
                </button>
              </div>
            </form>
          </div>
        </div>
        <div className="text-center mt-4">
          <Link
            to="/login"
            className="text-sm font-medium text-purple-300 hover:text-purple-100 transition duration-150 ease-in-out"
          >
            Remember your password? Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
