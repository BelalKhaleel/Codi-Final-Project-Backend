import User from "../models/userModel.js";
import bcrypt from "bcrypt";
import { generateToken } from "../controllers/authController.js";
import mongoose from "mongoose";
import  jwt  from "jsonwebtoken";

//get all users
export const getAllUsers = async (req, res, next) => {
  try {
    const { page, limit } = req.query;

    const pageNumber = parseInt(page);
    const limitNumber = parseInt(limit);

    // Paginate users using mongoose-paginate-v2
    const options = {
      page: pageNumber || 1,
      limit: limitNumber || 10,
      populate: "address", // specify the field to populate
    };

    const users = await User.paginate({}, options);

    return res.status(200).json({
      users: users.docs,
      totalPages: users.totalPages,
      currentPage: users.page,
      limit: users.limit,
      totalUsers: users.totalDocs,
    });
  } catch (err) {
    next(err);
  }
};

//get an user by id
export const getUserById = async (req, res, next) => {
  try {
    let { id } = req.params;
    let user = await User.findOne({ _id: id });
    if (!user) {
      throw new Error("User not found");
    }
    res.status(200).json({ success: true, user });
  } catch (error) {
    if (error instanceof mongoose.CastError) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(404).json({ success: false, message: error.message });
  }
};

//get user by donor id
export const getUserByDonorId = async (req, res) => {
  try {
    const donorId = req.params.donorId;
    const user = await User.findById(donorId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// User Registration
export const signup_user = async (req, res, next) => {
  try {
    const { fullName, email, password, phoneNumber, address, isAdmin } =
      req.body;

    if (!fullName) {
      return res.status(400).json({
        message: "Full Name is required",
      });
    }

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    if (!password) {
      return res.status(400).json({
        message: "Password is required",
      });
    }

    if (!phoneNumber) {
      return res.status(400).json({
        message: "Phone Number is required",
      });
    }

    if (!address) {
      return res.status(400).json({
        message: "Address is required",
      });
    }

    // Check if email already exists
    const existingUser = await User.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(409).json({
        message: "Email already exists",
      });
    }

    // Check if phone number already exists
    const existingPhone = await User.findOne({
      phoneNumber: req.body.phoneNumber,
    });
    if (existingPhone) {
      return res.status(409).json({
        message: "Phone Number already exists",
      });
    }

    const newUser = new User({
      fullName: fullName,
      email: email,
      password: password,
      phoneNumber: phoneNumber,
      address: address,
      isAdmin: isAdmin,
    });

    const savedUser = await newUser.save();

    let message = isAdmin === true ? "Admin Created" : "User Created";

     // Generate token and login the signed up user automatically
     const token = generateToken({
      _id: savedUser._id,
      email: savedUser.email,
      isAdmin: savedUser.isAdmin,
    }); // Customize token payload as needed

    // Create a new object without the password field
    const userResponse = {
      _id: savedUser._id,
      fullName: savedUser.fullName,
      email: savedUser.email,
      phoneNumber: savedUser.phoneNumber,
      address: savedUser.address,
      isAdmin: savedUser.isAdmin,
    };

    res.status(201).json({
      success: true,
      response: userResponse,
      message,
      "user-token": token
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err.message,
    });
  }
};

//User login
export const user_login = async (req, res, next) => {
  try {
    // Check if email and password are provided
    const { email, password } = req.body;

    // Check if email exists in database
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    // Check if password is correct
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Wrong password" });
    }
    // GenerisValidPasswordate and send authentication token
    const token = generateToken({
      _id: user._id,
      email: user.email,
      isAdmin: user.isAdmin,
    }); // Customize token payload as needed
    const response = {
      _id: user._id,
      email: user.email,
    }
    res.json(
      { 
        success: true,
        message: "User logged in successfully!",
        response: response,
        "user-token": token },
    );

  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: error.message,
    });
  }
};

//update a user by id
export const editUser = async (req, res, next) => {
  const { id } = req.params;
  const { fullName, email, password, address, phoneNumber, isAdmin } = req.body;

  try {
    // check if the user exists
    const user = await User.findById(id);
    if (!user) {
      return res.status(404).send({ error: "User does not exist" });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const response = await User.findOneAndUpdate(
      { _id: id },
      {
        fullName,
        email,
        password: hashedPassword,
        address,
        phoneNumber,
        isAdmin,
      },
      {
        new: true,
      }
    );
    const message = isAdmin
      ? "Admin updated successfully!"
      : "User updated successfully!";
    res.status(200).send({ success: true, message, response });
  } catch (err) {
    console.log(err);
    return next(err);
  }
};

//delete user
export const delete_user = async (req, res, next) => {
  try {
    const result = await User.findByIdAndDelete(req.params.id);
    if (!result) {
      return res.status(404).json({
        error: "User not found",
      });
    }
    res.status(200).json({
      success: true,
      result,
      message: "User deleted successfully",
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: err,
    });
  }
};

// check if the user has a token and is logged in
export function isLoggedIn(req, res, next) {
  let token = req.headers["user-token"];
  if (!token) {
      return res.status(403).json({ success: false, message: "Token not found" });
  } else {
      try { 
        const decoded = jwt.verify(token, process.env.JWT_SECRET);          
          res.status(200).json({ success: true, message: decoded });
      } catch (err) {
          return res.status(401).send("Invalid Token");
      }
  }
}
