import express from "express";
import rateLimit from "express-rate-limit";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";

import { corsConfig, rateLimits } from "./src/config/env.mjs";
import { morganConfig } from "./src/utils/logger.mjs";
import swaggerSpec from "./src/swagger/swagger.mjs";
import indexRouter from "./src/routes/index.mjs";
import { errorHandler } from "./src/middlewares/errorHandler.mjs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(rateLimit(rateLimits));
app.use(cors(corsConfig));
app.use(helmet());
app.use(morgan(morganConfig.format, { stream: morganConfig.stream }));

app.use("/api/v1", indexRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req, res) => res.json({ message: "Server is running" }));

app.use(errorHandler);

app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

export default app;
