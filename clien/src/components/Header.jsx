import React, { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/images/logo.png";
import { authContext } from "../context/authContext";
import { toast } from "react-toastify";
import axios from "axios";
import useGetProfile from "../hooks/useFetchdata";
import { BASE_URL } from "../config";
import { ProfileContext } from "../context/ProfileContext";

const Header = () => {
  const navigate = useNavigate();
  const { user, dispatch } = useContext(authContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [defaultUsers, setDefaultUsers] = useState([]);
  const { data, loading, error } = useGetProfile(`${BASE_URL}/profile`);
  const handleLogin = () => {
    navigate("/login");
    console.log(data);
  };
  const { setProfileData } = useContext(ProfileContext); // Use the context

  useEffect(() => {
    if (data) {
      setProfileData(data); // Set the profile data in the context
    }
  }, [data, setProfileData]);

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" });
    toast.success("logged out successfully");
    navigate("/login");
  };
  const toggleSearch = async () => {
    setIsSearchOpen(!isSearchOpen);
    setSearchQuery("");
    setSearchResults([]);
    if (!isSearchOpen) {
      await fetchDefaultUsers();
    }
  };

  const fetchDefaultUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:8000/api/user/default",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Default users response:", response.data);
      setDefaultUsers(response.data);
    } catch (error) {
      console.error("Error fetching default users:", error);
    }
  };

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        searchUsers();
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const searchUsers = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        `http://localhost:8000/api/user/search?query=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setSearchResults(response.data);
    } catch (error) {
      console.error("Error searching users:", error);
    }
  };
  const displayUsers = searchQuery ? searchResults : defaultUsers;
  return (
    <>
      <nav className="bg-black text-white p-4 py-6">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center">
            <img src={logo} alt="" className="h-18 w-14 mr-2" />
            <span className="text-xl font-bold">TicTacToe</span>
          </div>

          <div className="hidden md:flex space-x-6">
            <Link
              to="/"
              className="hover:text-orange-500 transition-colors duration-200 text-xl"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="hover:text-orange-500 transition-colors duration-200 text-xl"
            >
              About Us
            </Link>
            <Link
              to="/feedback"
              className="hover:text-orange-500 transition-colors duration-200 text-xl"
            >
              Feedback
            </Link>
            <Link
              to="/features"
              className="hover:text-orange-500 transition-colors duration-200 text-xl"
            >
              Featured
            </Link>
            <Link
              to="/contact"
              className="hover:text-orange-500 transition-colors duration-200 text-xl"
            >
              Contact Us
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <button
                  aria-label="Search"
                  className="hover:text-orange-500 transition-colors duration-200 text-xl"
                  onClick={toggleSearch}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-xl"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
                <div className="relative">
                  <button
                    aria-label="Profile"
                    className="hover:text-orange-500 transition-colors duration-200"
                    onClick={toggleDropdown}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-xl"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </button>
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                      >
                        Profile
                      </Link>
                      <Link
                        to="/theme"
                        className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                      >
                        Theme
                      </Link>
                      <Link
                        to="/settings"
                        className="block px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-lg text-gray-700 hover:bg-gray-100"
                      >
                        Logout
                      </button>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <button
                onClick={handleLogin}
                className="bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded transition-colors duration-200"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </nav>
      {isSearchOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center pt-20 z-50">
          <div className="bg-white w-full max-w-3xl rounded-lg shadow-lg overflow-hidden">
            <div className="p-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search users by username or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
                <button
                  onClick={toggleSearch}
                  className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
            </div>
            <div className="border-t border-gray-200 max-h-64 overflow-y-auto">
              {searchResults.length > 0
                ? searchResults.map((user) => (
                    <Link
                      key={user._id}
                      to={`/profile/${user._id}`}
                      className="block px-4 py-2 hover:bg-gray-100 transition-colors duration-200"
                      onClick={toggleSearch}
                    >
                      <div className="flex items-center">
                        <img
                          src={user.avatar || "https://via.placeholder.com/40"}
                          alt={user.username}
                          className="w-10 h-10 rounded-full mr-3"
                        />
                        <div>
                          <p className="font-semibold text-gray-800">
                            {user.username}
                          </p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                    </Link>
                  ))
                : searchQuery && (
                    <p className="px-4 py-2 text-gray-600">No users found</p>
                  )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
