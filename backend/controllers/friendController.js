import mongoose from "mongoose";
import User from "../models/User.js"

export const getUserFriends = async(req,res)=>{
    try {
        const user = await User.findById(req.userId).populate('friends', 'id username email avatar');
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user.friends); // Just send the friends array
      } catch (error) {
        console.error(error.message);
        res.status(500).json({ message: 'Server error' });
      }
}

export const checkFriend = async(req,res)=>{
    try {
        const { id } = req.params; // The ID of the user we're checking friendship status with
        console.log("ID:",id)
        const currentUserId = req.userId; // Set by the authenticate middleware
        console.log("CurrentUserId",currentUserId)
    
        // Find the current user and check if userId is in their friends list
        const currentUser = await User.findById(currentUserId);
        
        if (!currentUser) {
          return res.status(404).json({ message: 'Current user not found' });
        }
    
        const isFriend = currentUser.friends.includes(id);
    
        res.json({ isFriend });
      } catch (error) {
        console.error('Error checking friend status:', error);
        res.status(500).json({ message: 'An error occurred while checking friend status' });
      }
}

export const addFriend = async(req,res)=>{
    const { friendId } = req.params;
    const userId = req.userId; // Get user ID from token

    try {
        // Find the user and add the friend
        const user = await User.findById(userId);
        
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        if (user.friends.includes(friendId)) {
            return res.status(400).json({ success: false, message: "Already friends" });
        }

        user.friends.push(friendId);
        await user.save();

        res.json({ success: true, message: "Friend added successfully" });
    } catch (error) {
        console.error("Error adding friend:", error);
        res.status(500).json({ success: false, message: "Server error" });
    }
}

export const removeFriend = async(req,res)=>{
    try {
        const loggedInUserId = req.userId; // Get logged-in user ID from middleware
        const friendId = req.params.id; // Get friend's ID from request parameters
    
        // Remove friendId from logged-in user's friends array
        await User.findByIdAndUpdate(loggedInUserId, {
          $pull: { friends: friendId }
        });
    
        // Remove logged-in user's ID from friend's friends array (optional)
        // await User.findByIdAndUpdate(friendId, {
        //   $pull: { friends: loggedInUserId }
        // });
    
        res.json({ message: 'Friend removed successfully' });
      } catch (error) {
        console.error('Error removing friend:', error);
        res.status(500).json({ message: 'An error occurred while removing friend' });
      }
}