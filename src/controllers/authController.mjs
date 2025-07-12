import {
  createUserService,
  loginService,
  logoutService,
} from "../service/authService.mjs";
import { successResponse } from "../utils/responseBuilder.mjs";
import { logger } from "../utils/logger.mjs";

export const createUser = async (req, res, next) => {
  try {
    const result = await createUserService(req.body);
    return successResponse({
      res,
      statusCode: 201,
      message: result.message,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const login = async (req, res, next) => {
  try {
    const { token, user } = await loginService(req.body);

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return successResponse({
      res,
      statusCode: 200,
      message: "Login successful",
      data: { token, user },
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};

export const logout = (req, res, next) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Strict",
    });

    return successResponse({
      res,
      statusCode: 204,
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
