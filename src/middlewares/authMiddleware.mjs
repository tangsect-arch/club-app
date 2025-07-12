import jwt from "jsonwebtoken";
import { env } from "../config/env.mjs";
import { logger } from "../utils/logger.mjs";

export const authMiddleware = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    logger.error(`Access denied`);
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (decoded.role !== "user") {
      logger.error(`Access denied`);
      return res.status(403).json({ message: "Access forbidden. Users only." });
    }
    req.body = { ...req.body, userId: decoded.id };

    next();
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Invalid token." });
  }
};

export const verifySuperAdmin = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    logger.error(`Access denied`);
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (decoded.role !== "superadmin") {
      logger.error(`Access denied`);
      return res
        .status(403)
        .json({ message: "Access forbidden. Superadmins only." });
    }
    req.user = decoded;
    next();
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Invalid token." });
  }
};

export const verifyClubAdmin = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    logger.error(`Access denied`);
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (decoded.role !== "clubadmin") {
      logger.error(`Access denied`);
      return res
        .status(403)
        .json({ message: "Access forbidden. Club admins only." });
    }
    req.user = decoded;
    next();
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Invalid token." });
  }
};

export const authenticateAdmins = (req, res, next) => {
  const allowedRoles = ["superadmin", "clubadmin"];
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    logger.error(`Access denied`);
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, env.JWT_SECRET);
    if (!decoded || !allowedRoles.includes(decoded.role)) {
      logger.error(`Access denied`);
      return res.status(403).json({ message: "Access forbidden. Users only." });
    }
    req.user = decoded;
    next();
  } catch (error) {
    logger.error(error);
    res.status(400).json({ message: "Invalid token." });
  }
};

export const generateToken = (user) => {
  const token = jwt.sign({ id: user._id, role: user.role }, env.JWT_SECRET, {
    expiresIn: env.JWT_EXPIRATION || "1h",
  });
  return token;
};
