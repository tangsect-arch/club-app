import User from "../models/User.mjs";
import { generateToken } from "../middlewares/authMiddleware.mjs";
import { calculateAge, formatDate, validateFields } from "../utils/helper.mjs";

export const createUserService = async (userData) => {
  const {
    username,
    email,
    password,
    name,
    phone,
    dob,
    role = "user",
  } = userData;

  const validation = validateFields(userData);
  if (!validation.success) {
    throw new Error(validation.message);
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

  try {
    await newUser.save();
  } catch (error) {
    if (error.code === 11000) {
      throw new Error("Duplicate entry");
    }
    throw error;
  }

  return {
    success: true,
    message: "User registered successfully",
  };
};

export const loginService = async (loginData) => {
  const { username, password } = loginData;

  const user = await User.findOne({
    username: username.trim().toLowerCase(),
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isMatch = user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid password");
  }

  const token = generateToken(user);

  return {
    token,
    user: {
      id: user._id,
      username: user.username,
      email: user.email,
      name: user.name,
      role: user.role,
      phone: user.phone,
      dob: user.dob,
      status: user.status,
      age: calculateAge(user.dob),
    },
  };
};

export const logoutService = () => {
  return {
    success: true,
    message: "Logout successful",
  };
};
