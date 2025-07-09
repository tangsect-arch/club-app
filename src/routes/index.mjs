import express from "express";
const routingApp = express();

import authRouter from "./auth.mjs";

routingApp.use("/auth", authRouter);

export default routingApp;
