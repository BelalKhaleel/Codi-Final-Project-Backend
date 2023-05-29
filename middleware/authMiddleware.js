import jwt from "jsonwebtoken";
import User from "../models/userModel.js";

// Middleware to authenticate user
export const authenticateUser = async (req, res, next) => {
  try {
    // Assuming token is stored in a cookie
    // console.log(req.cookies);
    const token = req.headers["user-token"];
    console.log(token)
    if (!token) {
      return res.status(401).json({ message: "Unauthorized: Token not found" });
    }

    // Verify and decode JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
    // Check user role based on decoded token
    console.log(decodedToken.id);
    const user = await User.findById(decodedToken.id);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized: User not found" });
    }
    req.user = {
      id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    };
    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};

// Middleware to authenticate admin
export const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.cookies["user-token"]; // Assuming token is stored in a cookie
    // const token = req.headers.authorization.split(" ")[1];

    if (!token) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Verify and decode JWT token
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET);

    // Check user role based on decoded token
    const user = await User.findById(decodedToken.id);
    if (!user || !user.isAdmin) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Store user information in request object
    if (user.isAdmin === true) {
      // Admin role
      req.user = {
        id: user._id,
        email: user.email,
        isAdmin: true,
      };
    } else {
      return res.status(401).json({ message: "Unauthorized" });
    }

    next();
  } catch (err) {
    return res.status(401).json({ message: "Invalid token" });
  }
};
