import { logger } from "./logger.mjs";

export const calculateAge = (dob) => {
  const birthDate = new Date(dob);
  const today = new Date();
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  const dayDiff = today.getDate() - birthDate.getDate();
  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age--;
  }
  return age;
};

export const formatDate = (date) => {
  const d = new Date(date);
  const formattedVal = d.toISOString().split("T")[0];
  return formattedVal;
};

export const validateFields = (fields) => {
  let errorMessages = [];
  if (!fields) {
    logger.error("Fields are required");
    return { status: 400, success: false, message: "Fields are required" };
  }
  const { username, email, password, name, phone, dob, role = "user" } = fields;
  if (!username || !email || !password || !name || !phone || !dob || !role) {
    logger.error("All fields are required");
    errorMessages.push("All fields are required");
  }

  if (username.length < 3 || username.length > 20) {
    logger.error("Username must be between 3 and 20 characters");
    errorMessages.push("Username must be between 3 and 20 characters");
  }
  if (!/^[a-zA-Z0-9_]+$/.test(username)) {
    logger.error("Username can only contain letters, numbers, and underscores");
    errorMessages.push(
      "Username can only contain letters, numbers, and underscores"
    );
  }

  let formattedDob = new Date(dob);
  if (isNaN(formattedDob.getTime())) {
    logger.error("Invalid date of birth");
    errorMessages.push("Invalid date of birth");
  }

  if (new Date() < formattedDob) {
    logger.error("Date of birth cannot be in the future");
    errorMessages.push("Date of birth cannot be in the future");
  }

  formattedDob = formatDate(formattedDob);

  if (calculateAge(formattedDob) < 15) {
    logger.error("User must be at least 15 years old");
    errorMessages.push("User must be at least 15 years old");
  }

  if (role && !["user", "clubadmin", "superadmin"].includes(role)) {
    logger.error("Role must be either 'user', 'clubadmin' or 'superadmin'");
    errorMessages.push("Invalid role.");
  }

  return errorMessages.length > 0
    ? { status: 400, success: false, message: errorMessages.join(", ") }
    : { status: 400, success: true, message: "Validation successful" };
};
