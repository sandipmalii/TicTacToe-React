import React, { useState, useEffect } from "react";
import fire from "../assets/images/fire.svg";
import { LuSwords } from "react-icons/lu";
import { useParams } from "react-router-dom";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import { FiUserPlus, FiMessageSquare, FiUserMinus } from "react-icons/fi";
import { TbTrophy } from "react-icons/tb";
import axios from "axios";
import { FaHeartBroken } from "react-icons/fa";
import { toast } from "react-toastify";
const Playerdetails = () => {
  const { id } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isFriend, setIsFriend] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("token");
        const [profileResponse, friendStatusResponse] = await Promise.all([
          axios.get(`http://localhost:8000/api/user/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get(`http://localhost:8000/api/friends/status/${id}`, {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setProfile(profileResponse.data);
        setIsFriend(friendStatusResponse.data.isFriend);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(
          error.response?.data?.message ||
            "An error occurred while fetching the data"
        );
        setLoading(false);
      }
    };

    fetchProfile();
  }, [id]);

  const handleAddFriend = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `http://localhost:8000/api/friends/add-friend/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.message);
      setIsFriend(true);
    } catch (error) {
      console.error("Error adding friend:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };

  const handleRemoveFriend = async () => {
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        `http://localhost:8000/api/friends/removefriend/${id}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success(response.data.message);
      setIsFriend(false);
    } catch (error) {
      console.error("Error removing friend:", error);
      toast.error(error.response?.data?.message || "An error occurred");
    }
  };
  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        Error: {error}
      </div>
    );
  if (!profile)
    return (
      <div className="flex items-center justify-center h-screen">
        User not found
      </div>
    );

  return (
    <div className="bg-gray-900 text-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex items-center mb-6">
                <img
                  src={profile.avatar}
                  alt={profile.name}
                  className="w-20 h-20 rounded-full mr-4"
                />
                <div>
                  <h2 className="text-2xl font-bold">{profile.username}</h2>
                  <p className="text-gray-400">
                    Email: {profile.email || "N/A"}
                  </p>
                  <p className="text-gray-400">Rank: {profile.rank || "N/A"}</p>
                </div>
              </div>
              <div className="space-y-3">
                {[
                  { icon: FaFacebook, platform: "facebook" },
                  { icon: FaTwitter, platform: "twitter" },
                  { icon: FaLinkedin, platform: "linkedin" },
                  { icon: FaYoutube, platform: "youtube" },
                  { icon: FaInstagram, platform: "instagram" },
                ].map(({ icon: Icon, platform }) => (
                  <div key={platform} className="flex items-center">
                    <Icon className="mr-3 text-gray-400" />
                    <span>{profile.username}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Stats and Actions */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg flex items-center justify-center">
              <div className="w-2/3">
                <h3 className="text-xl font-semibold mb-4">Current Streak</h3>
                <p className="text-4xl font-bold mb-2">
                  {profile.totalWinningStreak}/{profile.totalGames}
                </p>
                <p className="text-sm text-gray-400">
                  Max streak: {profile.maxStreak}
                </p>
              </div>
              <img
                src={fire}
                className="w-12 h-15 flex justify-center items-center "
                alt=""
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {[
                {
                  icon: TbTrophy,
                  title: "Max. Win",
                  value: `${profile.totalWins}/${profile.totalGames}`,
                  color: "text-yellow-500",
                },
                {
                  icon: () => (
                    <span className="text-red-600 mr-4 text-4xl flex items-center justify-center w-12 h-12">
                      <FaHeartBroken />
                    </span>
                  ),
                  title: "Lost",
                  value: `${profile.totalLosses}/${profile.totalGames}`,
                  color: "text-red-600",
                },
                {
                  icon: () => (
                    <span className="mr-4 text-4xl flex items-center justify-center w-12 h-12">
                      🔄
                    </span>
                  ),
                  title: "Draw",
                  value: `${profile.totalDraws}/${profile.totalGames}`,
                  color: "text-blue-500",
                },
              ].map(({ icon: Icon, title, value, color }) => (
                <div
                  key={title}
                  className="bg-gray-800 rounded-lg p-4 shadow-lg flex items-center"
                >
                  <Icon
                    className={`${color} mr-4 text-4xl flex items-center justify-center w-12 h-12`}
                  />
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="text-lg">{value}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap gap-4">
              {isFriend ? (
                <button
                  onClick={handleRemoveFriend}
                  className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300"
                >
                  <FiUserMinus className="mr-2" /> Remove friend
                </button>
              ) : (
                <button
                  onClick={handleAddFriend}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300"
                >
                  <FiUserPlus className="mr-2" /> Add friend
                </button>
              )}
              <button
                onClick={() => console.log("Message clicked")}
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300"
              >
                <FiMessageSquare className="mr-2" /> Message
              </button>
              <button
                onClick={() => console.log("Challenge clicked")}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300"
              >
                <LuSwords className="mr-2" /> Challenge
              </button>
            </div>
          </div>
        </div>

        {/* Completed Games */}
        <div className="mt-12">
          <h3 className="text-2xl font-semibold mb-6">Completed Games</h3>
          <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-700">
                  <th className="py-3 px-4 text-left">Players</th>
                  <th className="py-3 px-4 text-left">Result</th>
                  <th className="py-3 px-4 text-left">Dates</th>
                </tr>
              </thead>
              <tbody>
                {/* Replace this with actual game data */}
                <tr className="border-b border-gray-700">
                  <td className="py-3 px-4">he vs pe2</td>
                  <td className="py-3 px-4">WIN 🏆</td>
                  <td className="py-3 px-4">Feb 27, 2024</td>
                </tr>
                <tr>
                  <td className="py-3 px-4">he vs pe2</td>
                  <td className="py-3 px-4">Loss</td>
                  <td className="py-3 px-4">Feb 21, 2024</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playerdetails;
