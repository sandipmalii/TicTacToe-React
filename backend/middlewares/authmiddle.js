import jwt from 'jsonwebtoken';

export const authenticate = async (req, res, next) => {
 
    
    // Get token from headers
    const authToken = req.headers.authorization;

    // Check if token exists
    if (!authToken || !authToken.startsWith('Bearer ')) {
        return res.status(401).json({ success: false, message: "No token, authorization denied" });
    }

    try {
        // Remove the "Bearer " prefix from the token
        const token = authToken.split(' ')[1];


        // Log the JWT_SECRET_KEY (be cautious with this in production)
        // console.log("JWT_SECRET_KEY:", process.env.JWT_SECRET_KEY);

        // Verify the token and get the user information from the payload
        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);


        // Check if decoded contains the expected fields
        if (!decoded.userID) {
            throw new Error("Token payload is missing required fields");
        }

        req.userId = decoded.userID;


        // console.log("Set req.userId:", req.userId);

        // Call the next middleware
        next();
    } catch (error) {
        console.error("Token verification error:", error);
        if (error.name === 'TokenExpiredError') {
            return res.status(401).json({ success: false, message: "Token has expired" });
        } else if (error.name === 'JsonWebTokenError') {
            return res.status(401).json({ success: false, message: "Invalid token" });
        }
        res.status(401).json({ success: false, message: "Authentication failed", error: error.message });
    }
};