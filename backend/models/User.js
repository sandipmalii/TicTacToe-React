import mongoose from "mongoose";

// Define the user schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    
    trim: true,
    index: true
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  
  avatar: {
    type: String,
    default: "https://res.cloudinary.com/srinivascloud/image/upload/v1729008606/fk3bvgyputboaq66uygf.png" // Replace with your actual default avatar URL
  },
  password: {
    type: String,
    required: true,
    trim: true
  },
  totalGames: {
    type: Number,
    default: 0
  },
  totalWins: {
    type: Number,
    default: 0
  },
  totalLosses: {
    type: Number,
    default: 0
  },
  totalDraws: {
    type: Number,
    default: 0
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  totalWinningStreak: {
    type: Number,
    default: 0
  },
  maxStreak: {
    type: Number,
    default: 0
  },
  tc: {
    type: Boolean,
    // required: true
  },
  friends: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, {
  timestamps: true // This line is moved here
});

// Create the UserModel
const UserModel = mongoose.model("User", userSchema);

// Export the UserModel as a named export
export default UserModel;


