import React, { useState, useContext, useEffect } from "react";
import { authContext } from "../context/authContext";
import { ProfileContext } from "../context/ProfileContext"; // Import the ProfileContext
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import uploadImageToCloudinary from "../utils/uploadCloudinary";
import { useNavigate } from "react-router-dom";

const Settings = () => {
  const { user, dispatch } = useContext(authContext);
  const { profileData, setProfileData } = useContext(ProfileContext); // Use the ProfileContext
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    username: "",
    name: "",
    email: "",
    avatar: "",
  });
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (profileData) {
      setUserData({
        username: profileData.username || "",
        name: profileData.name || "",
        email: profileData.email || "",
        avatar: profileData.avatar || "",
      });
    }
  }, [profileData]);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `http://localhost:8000/api/profile/save/${profileData._id}`,
        userData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setProfileData({ ...profileData, ...userData }); // Update the profile data in the context
      toast.success(response.data.message);
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error(error.response.data.message || "Failed to update profile");
    }
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsUploading(true);

    try {
      const data = await uploadImageToCloudinary(file);

      if (data.secure_url) {
        setUserData((prevData) => ({
          ...prevData,
          avatar: data.secure_url,
        }));
        toast.success(
          "Avatar uploaded successfully! Click 'Save Changes' to update your profile."
        );
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setIsUploading(false);
    }
  };

  if (!profileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col space-y-6">
          {/* Top Section */}
          <div className="flex flex-col md:flex-row md:space-x-6">
            {/* Player Info */}
            <div className="md:w-1/2 bg-gray-800 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="w-24 h-24 rounded-full overflow-hidden mr-4">
                  {userData.avatar ? (
                    <img
                      src={userData.avatar}
                      alt="User avatar"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-600 flex items-center justify-center">
                      <span className="text-3xl">
                        {userData.name ? userData.name[0].toUpperCase() : "?"}
                      </span>
                    </div>
                  )}
                </div>
                <div>
                  <h2 className="text-2xl font-bold p-1">
                    {userData.username}
                  </h2>
                  <p className="text-sm text-gray-400 p-2">Rank 001</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex items-center">
                  <FaFacebookF className="w-4 h-4 mr-2" />
                  <span className="text-sm">{userData.username}</span>
                </div>
                <div className="flex items-center">
                  <FaTwitter className="w-4 h-4 mr-2" />
                  <span className="text-sm">{userData.username}</span>
                </div>
                <div className="flex items-center">
                  <FaLinkedinIn className="w-4 h-4 mr-2" />
                  <span className="text-sm">{userData.username}</span>
                </div>
                <div className="flex items-center">
                  <FaYoutube className="w-4 h-4 mr-2" />
                  <span className="text-sm">{userData.username}</span>
                </div>
                <div className="flex items-center">
                  <FaInstagram className="w-4 h-4 mr-2" />
                  <span className="text-sm">{userData.username}</span>
                </div>
              </div>
            </div>

            {/* Current Streak */}
            <div className="md:w-1/2 bg-gray-800 p-6 rounded-lg">
              <h3 className="text-lg font-bold mb-4">Current Streak</h3>
              <div className="text-center mb-4">
                <p className="text-3xl font-bold">
                  {profileData.totalWinningStreak || 0}/1600
                </p>
                <p className="text-sm text-gray-400">
                  Max streak: {profileData.maxStreak || 0}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-4">
                <div className="text-center">
                  <p className="font-bold">Max. Win</p>
                  <p>{profileData.totalWins || 0}/1000</p>
                </div>
                <div className="text-center">
                  <p className="font-bold">Lost</p>
                  <p>{profileData.totalLosses || 0}/1000</p>
                </div>
                <div className="text-center">
                  <p className="font-bold">Draw</p>
                  <p>{profileData.totalDraws || 0}/1000</p>
                </div>
              </div>
            </div>
          </div>

          {/* Edit Section */}
          <div className="w-full md:w-4/5 mx-auto bg-gray-800 p-6 rounded-lg">
            <h3 className="text-xl font-bold mb-6">Update Profile</h3>
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-sm font-medium text-gray-400"
                >
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  value={userData.username}
                  onChange={handleInputChange}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-400"
                >
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleInputChange}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-400"
                >
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={userData.email}
                  onChange={handleInputChange}
                  className="mt-1 block w-full bg-gray-700 border border-gray-600 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div className="flex items-center space-x-4">
                {userData.avatar && (
                  <img
                    src={userData.avatar}
                    alt="Avatar preview"
                    className="w-12 h-12 rounded-full object-cover"
                  />
                )}
                <label className="cursor-pointer bg-blue-600 text-white px-3 py-2 rounded-md hover:bg-blue-700 transition-colors duration-300">
                  {isUploading ? "Uploading..." : "Upload Photo"}
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleImageUpload}
                    accept=".jpg,.png"
                    disabled={isUploading}
                  />
                </label>
              </div>
            </div>
            <button
              onClick={handleSave}
              className="mt-6 w-full bg-pink-600 text-white px-4 py-2 rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-300"
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
