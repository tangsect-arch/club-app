import express from "express";
const routingApp = express();

import authRouter from "./auth.mjs";
// import adminRouter from "./admin.mjs";
// import userRouter from "./user.mjs";
// import commonRouter from "./common.mjs";
// import { authMiddleware, verifyAdmin } from "../middlewares/authMiddleware.mjs";

routingApp.use("/auth", authRouter);
// routingApp.use("/common", commonRouter);
// routingApp.use("/admin", verifyAdmin, adminRouter);
// routingApp.use("/user", authMiddleware, userRouter);

export default routingApp;
