



import UserModel from '../models/User.js'; 
import bcrypt from 'bcryptjs'; 
import jwt from 'jsonwebtoken'; 
// import transporter from '../config/emailConfig.js'; 
// import { uploadOnCloudinary } from "../utils/cloudinary.js";
import Feedback from "../models/Feedback.js"

class UserController {

  // 
  
  static userRegistration = async (req, res) => {
    const { username, email, password , avatar} = req.body;

    // Check if all required fields are provided
    if (!username || !email || !password) {
      return res.status(400).json({ "status": "failed", "message": "All fields are required" });
    }

    try {
      // Check if the email is already registered
      const userExists = await UserModel.findOne({ email: email });
      if (userExists) {
        return res.status(400).json({ "status": "failed", "message": "Email already exists" });
      }
      const emailExists = await UserModel.findOne({ username:username})
      if(emailExists){
        return res.status(400).json({ "message":"Username Already exsits"})
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(password, salt);

      // Create new user
      const newUser = new UserModel({
        username: username,
        email: email,
        password: hashPassword,
        avatar: avatar || undefined // If avatar is not provided, it will use the default from the schema
      });

      // Save the new user to the database
      await newUser.save();

      // Generate JWT token
      const token = jwt.sign({ userID: newUser._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });

      // Send success response
      res.status(201).json({ "status": "success", "message": "Registration Success", "token": token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ "status": "failed", "message": "Unable to Register" });
    }
  }




  static userLogin = async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).send({ "status": "failed", "message": "All Fields are Required" });
      }

      const user = await UserModel.findOne({ email: email });

      if (!user) {
        return res.status(400).send({ "status": "failed", "message": "You are not a Registered User" });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).send({ "status": "failed", "message": "Email or Password is not Valid" });
      }

      const token = jwt.sign({ userID: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5d' });

      res.status(200).json({ "status": "success", "message": "Login Success", "token": token, "user":user });
    } catch (error) {
      console.log(error);
      res.status(500).json({ "status": "failed", "message": "Unable to Login" });
    }
  }

  static changeUserPassword = async (req, res) => {
    const { password, password_confirmation } = req.body;
    if (password && password_confirmation) {
      if (password !== password_confirmation) {
        res.status(400).send({ "status": "failed", "message": "New Password and Confirm New Password do not match" });
      } else {
        const salt = await bcrypt.genSalt(10);
        const newHashPassword = await bcrypt.hash(password, salt);
        try {
          await UserModel.findByIdAndUpdate(req.user._id, { $set: { password: newHashPassword } });
          res.send({ "status": "success", "message": "Password changed successfully" });
        } catch (error) {
          console.error(error);
          res.status(500).send({ "status": "failed", "message": "An error occurred while changing password" });
        }
      }
    } else {
      res.status(400).send({ "status": "failed", "message": "Both Password and Confirm Password are required fields" });
    }
  }

  static loggedUser = async (req, res) => {
    try {
      const user = req.user;
      console.log(user.email)
      res.status(200).json({ "status": "success", "user": user });
    } catch (error) {
      console.error("Error retrieving logged-in user information:", error);
      res.status(500).json({ "status": "error", "message": "Error retrieving logged-in user information" });
    }
  }

//   static sendUserPasswordResetEmail = async (req, res) => {
//     const { email } = req.body;
//     console.log(email);
//     if (email) {
//       const user = await UserModel.findOne({ email: email });
//       if (user) {
//         const secret = user._id + process.env.JWT_SECRET_KEY;
//         const token = jwt.sign({ userID: user._id }, secret, { expiresIn: '15m' });
//         const link = `http://localhost:3000/Components/HTMLS/forgetPassword.html/${user._id}/${token}`;
//         let info = await transporter.sendMail({
//           from: process.env.EMAIL_FROM,
//           to: user.email,
//           subject: "TicTacToe - Password Reset Link",
//           html: `<a href=${link}>Click Here</a> to Reset Your Password`
//         });
//         res.send({ "status": "success", "message": "Password Reset Email Sent... Please Check Your Email" });
//       } else {
//         res.send({ "status": "failed", "message": "Email doesn't exist" });
//       }
//     } else {
//       res.send({ "status": "failed", "message": "Email Field is Required" });
//     }
//   }

//   static userPasswordReset = async (req, res) => {
//     const { password, password_confirmation } = req.body;
//     try {
//       if (password && password_confirmation) {
//         if (password !== password_confirmation) {
//           res.send({ "status": "failed", "message": "New Password and Confirm New Password doesn't match" });
//         } else {
//           const salt = await bcrypt.genSalt(10);
//           const newHashPassword = await bcrypt.hash(password, salt);
//           await UserModel.findByIdAndUpdate(user._id, { $set: { password: newHashPassword } });
//           res.send({ "status": "success", "message": "Password Reset Successfully" });
//         }
//       } else {
//         res.send({ "status": "failed", "message": "All Fields are Required" });
//       }
//     } catch (error) {
//       console.log(error);
//       res.send({ "status": "failed", "message": "Invalid Token" });
//     }
//   }

  
static updateAccountDetails = async (req, res) => {
  const { name, username } = req.body;
  let avatar; // Define a variable to store the avatar path

  // Check if avatar file is included in the request
  if (req.file) {
    avatar = req.file.path; // Store the path of the uploaded avatar file
  }

  if (name || username) {
    return res.status(400).json({ success: false, message: "Name and username are required fields" });
  }

  try {
    // Retrieve the user's data from the database
    const user = await UserModel.findById(req.user?._id);

    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Update the user's details
    user.name = name;
    user.username = username;
    
    // If avatar is provided, update the avatar field
    if (avatar) {
      user.avatar = avatar;
    }

    // Save the updated user data
    const updatedUser = await user.save();

    // Remove password field from the response
    updatedUser.password = undefined;

    return res.status(200).json({ success: true, data: updatedUser, message: "Account details updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
}

static async getUser(req, res) {
  try {
    const userId = req.params.id;
    
    if (!userId) {
      return res.status(400).json({ message: 'User ID is required' });
    }

    const user = await UserModel.findById(userId).select('-password');
    
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Calculate additional statistics
    const totalGames = user.totalWins + user.totalLosses + user.totalDraws;
    const winRate = totalGames > 0 ? (user.totalWins / totalGames * 100).toFixed(2) : 0;

    const userProfile = {
      ...user.toObject(),
      totalGames,
      winRate
    };

    res.json(userProfile);
  } catch (error) {
    console.error('Error fetching user profile:', error);
    if (error.kind === 'ObjectId') {
      return res.status(400).json({ message: 'Invalid user ID format' });
    }
    res.status(500).json({ message: 'Internal server error' });
  }
}
//   static async updateUserAvatar(req, res) {
//     const { email } = req.body;
//     const avatarLocalPath = req.file.path;
// console.log(email)
//     try {
//       const avatar = await uploadOnCloudinary(avatarLocalPath);
//         const user = await UserModel.findOneAndUpdate({ email: email }, { avatar: avatar.url }, { new: true });

//         if (!user) {
//             return res.status(404).json({ success: false, message: 'User not found' });
//         }

//         return res.status(200).json({ success: true, message: 'Avatar updated successfully',user});
//     } catch (error) {
//         console.error('Error updating avatar:', error);
//         return res.status(500).json({ success: false, message: 'Internal server error', error: error.message });
//     }
// }

static async feedback(req,res){
  try {
    const { rating, comment } = req.body;
    const userId = req.userId; // Assuming you have authentication middleware that sets req.user
    console.log(userId ,"userid")

    const newFeedback = new Feedback({
      user: userId,
      rating,
      comment,
    });

    await newFeedback.save();

    res.status(201).json({ message: "Feedback submitted successfully", feedback: newFeedback });
  } catch (error) {
    console.error("Error submitting feedback:", error);
    res.status(500).json({ message: "Error submitting feedback", error: error.message });
  }
}

static async getallFeedback(req,res){
  try {
    const feedback = await Feedback.find()
      .populate('user', 'username') // Assuming your User model has a 'name' field
      .sort({ createdAt: -1 });
    
    res.status(200).json({ feedback });
  } catch (error) {
    console.error("Error fetching feedback:", error);
    res.status(500).json({ message: "Error fetching feedback", error: error.message });
  }
}
static updateGameStats = async (req, res) => {
  const { totalGames, totalWins, totalLosses, totalDraws, totalPoints, totalWinningStreak, maxStreak } = req.body;
  const userId = req.user._id; // Assuming you have user information available in req.user

  try {
    // Find the user by their ID
    const user = await UserModel.findById(userId);

    // Update the user's game statistics
    user.totalGames = totalGames || user.totalGames;
    user.totalWins = totalWins || user.totalWins;
    user.totalLosses = totalLosses || user.totalLosses;
    user.totalDraws = totalDraws || user.totalDraws;
    user.totalPoints = totalPoints || user.totalPoints;
    user.totalWinningStreak = totalWinningStreak || user.totalWinningStreak;
    user.maxStreak = maxStreak || user.maxStreak;

    // Save the updated user object
    const updatedUser = await user.save();

    // Return a success response
    return res.status(200).json({ success: true, message: "Game statistics updated successfully", user: updatedUser });
  } catch (error) {
    console.error("Error updating game statistics:", error);
    return res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};





// Assuming Express.js and Mongoose are being used

  static logoutUser = async (req, res) => {
    try {
      if (!req.user || !req.user.hasOwnProperty('_id')) {
        return res.status(400).json({ success: false, message: "User ID not found" });
      }

      const updatedUser = await UserModel.findByIdAndUpdate(
        req.user._id,
        {
          $unset: {
            refreshToken: 1
          }
        },
        {
          new: true
        }
      );

      const options = {
        httpOnly: true,
        secure: true
      };

      return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json({
          success: true,
          message: "User logged out successfully",
          user: updatedUser
        });
    } catch (error) {
      console.error("Error logging out user:", error);
      return res.status(500).json({
        success: false,
        message: "Internal Server Error"
      });
    }
  };

}

export default UserController;
