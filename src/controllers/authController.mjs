import { config } from "dotenv";
import User from "../models/User.mjs";
import { generateToken } from "../middlewares/authMiddleware.mjs";
import { logger } from "../utils/logger.mjs";
import { calculateAge, formatDate, validateFields } from "../utils/helper.mjs";

export const createUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      name,
      phone,
      dob,
      role = "user",
    } = req.body;
    const validate = validateFields(req.body);
    if (!validate.success) {
      logger.error(validate.message);
      return res.status(400).json(validate);
    }
    const formattedDob = formatDate(dob);
    const newUser = new User({
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password,
      name: name.trim(),
      phone,
      dob: formattedDob,
      role,
    });

    await newUser.save().catch((error) => {
      if (error.code === 11000) {
        logger.error("Duplicate entry");
        return res.status(400).json({
          success: false,
          message: "Duplicate entry",
        });
      }
      logger.error(error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    });
    res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({
      username: username.trim().toLowerCase(),
    });
    if (!user) {
      logger.error("User not found");
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    if (!user.comparePassword(password)) {
      logger.error("Invalid password");
      return res
        .status(404)
        .json({ success: false, message: "Invalid password" });
    }

    // user.age = calculateAge(user.dob);
    // const dob = formatDate(user.dob);
    // console.log(dob);
    // user.dob = dob;
    // console.log(user.dob);

    const token = generateToken(user);
    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    res.status(200).json({
      success: true,
      message: "Login successful",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        name: user.name,
        role: user.role,
        phone: user.phone,
        dob: user.dob,
        status: user.status,
        age: user.age,
      },
      token,
    });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });
    res.status(200).json({ success: true, message: "Logout successful" });
  } catch (error) {
    logger.error(error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
