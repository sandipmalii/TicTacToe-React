import React, { useState, useEffect } from "react";
import {
  FaFacebook,
  FaTwitter,
  FaLinkedin,
  FaYoutube,
  FaInstagram,
} from "react-icons/fa";
import { FiUserMinus, FiMessageSquare } from "react-icons/fi";
import { LuSwords } from "react-icons/lu";
import axios from "axios";
import { toast } from "react-toastify";

const Profile = () => {
  const [profile, setProfile] = useState(null);
  const [friends, setFriends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfileAndFriends = async () => {
      try {
        const token = localStorage.getItem("token");
        const [profileResponse, friendsResponse] = await Promise.all([
          axios.get("http://localhost:8000/api/profile", {
            headers: { Authorization: `Bearer ${token}` },
          }),
          axios.get("http://localhost:8000/api/friends", {
            headers: { Authorization: `Bearer ${token}` },
          }),
        ]);
        setProfile(profileResponse.data.data);
        setFriends(friendsResponse.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("Failed to load profile data");
        toast.error("Failed to load profile data");
        setLoading(false);
      }
    };

    fetchProfileAndFriends();
  }, []);

  const handleRemoveFriend = async (friendId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        `http://localhost:8000/api/friends/removefriend/${friendId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Immediately update the local state
      setFriends((prevFriends) =>
        prevFriends.filter((friend) => friend._id !== friendId)
      );

      toast.success("Friend removed successfully");
    } catch (error) {
      console.error("Error removing friend:", error);
      toast.error("Failed to remove friend");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        Error: {error}
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-900 text-white">
        No profile data available
      </div>
    );
  }

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Profile Card */}
          <div className="md:col-span-1">
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <div className="flex flex-col items-center mb-6">
                <img
                  src={profile.avatar || "/default-avatar.png"}
                  alt={`${profile.username}'s avatar`}
                  className="w-32 h-32 rounded-full mb-4"
                />
                <h2 className="text-2xl font-bold">
                  Username :{profile.username}
                </h2>
                <p className="text-2xl font-bold">name : {profile.name}</p>
                <p className="text-gray-400">Rank: {profile.rank || "N/A"}</p>
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

          {/* Stats and Friends */}
          <div className="md:col-span-2 space-y-6">
            {/* Current Streak */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg flex items-center justify-between">
              <div>
                <h3 className="text-xl font-semibold mb-2">Current Streak</h3>
                <p className="text-4xl font-bold">
                  {profile.currentStreak || 0}/{profile.totalGames || 0}
                </p>
                <p className="text-sm text-gray-400">
                  Max streak: {profile.maxStreak || 0}
                </p>
              </div>
              <div className="text-5xl">🔥</div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4">
              {[
                {
                  title: "Max. Win",
                  value: `${profile.totalWins || 0}/${profile.totalGames || 0}`,
                  icon: "🏆",
                },
                {
                  title: "Lost",
                  value: `${profile.totalLosses || 0}/${
                    profile.totalGames || 0
                  }`,
                  icon: "💔",
                },
                {
                  title: "Draw",
                  value: `${profile.totalDraws || 0}/${
                    profile.totalGames || 0
                  }`,
                  icon: "🔄",
                },
              ].map(({ title, value, icon }) => (
                <div
                  key={title}
                  className="bg-gray-800 rounded-lg p-4 shadow-lg flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold">{title}</p>
                    <p className="text-lg">{value}</p>
                  </div>
                  <div className="text-3xl">{icon}</div>
                </div>
              ))}
            </div>

            {/* Friends List */}
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-semibold mb-4">Friends</h3>
              <div className="space-y-4">
                {friends.map((friend) => (
                  <div
                    key={friend._id}
                    className="flex items-center justify-between bg-gray-700 p-3 rounded-lg"
                  >
                    <div>
                      <h4 className="font-bold">{friend.username}</h4>
                      <p className="text-sm text-gray-400">
                        Rank: {friend.rank || "N/A"}
                      </p>
                    </div>
                    <div className="flex space-x-2">
                      <button
                        onClick={() => handleRemoveFriend(friend._id)}
                        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300"
                      >
                        <FiUserMinus className="mr-2" /> Remove
                      </button>
                      <button className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300">
                        <FiMessageSquare className="mr-2" /> Message
                      </button>
                      <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded flex items-center transition duration-300">
                        <LuSwords className="mr-2" /> Challenge
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
