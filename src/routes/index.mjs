import express from "express";
const routingApp = express();

import authRouter from "./auth.mjs";
import adminRouter from "./admin.mjs";
import userRouter from "./user.mjs";
import club from "./club.mjs";
import commonRouter from "./common.mjs";
import {
  authMiddleware,
  authenticateAdmins,
  verifyClubAdmin,
  verifySuperAdmin,
} from "../middlewares/authMiddleware.mjs";

routingApp.use("/auth", authRouter);
routingApp.use("/common", commonRouter);
routingApp.use("/admin", verifyClubAdmin, adminRouter);
routingApp.use("/superadmin", verifySuperAdmin, club);
// routingApp.use("/user", authMiddleware, userRouter);

export default routingApp;
