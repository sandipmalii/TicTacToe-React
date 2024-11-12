import User from '../models/User.js'; 

export const searchUsers = async (req, res) => {
  try {
      const { query } = req.query;
      const loggedInUserId = req.userId; // Assuming you have middleware that sets req.userId

      if (!query) {
          return res.status(400).json({ message: "Search query is required" });
      }

      // Search for users based on username or email, excluding the logged-in user
      const users = await User.find({
          $and: [
              {
                  $or: [
                      { username: { $regex: query, $options: 'i' } },
                      { email: { $regex: query, $options: 'i' } }
                  ]
              },
              { _id: { $ne: loggedInUserId } } // Exclude logged-in user
          ]
      }).select('username email avatar'); // Removed limit to display all matching users

      res.json(users);
  } catch (error) {
      console.error('Error searching users:', error);
      res.status(500).json({ message: "An error occurred while searching users" });
  }
};
export const getDefaultUsers = async (req, res) => {
    try {
      const defaultUsers = await User.find()
        .sort({ createdAt: -1 })  // Sort by most recently created
        .limit(2)  // Limit to 2 users
        .select('username email avatar');
  
      res.json(defaultUsers);
    } catch (error) {
      console.error('Error fetching default users:', error);
      res.status(500).json({ message: "An error occurred while fetching default users" });
    }
  };