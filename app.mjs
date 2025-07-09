import express from "express";
import rateLimit from "express-rate-limit";
import { corsConfifg, rateLimits } from "./src/config/env.mjs";
import cors from "cors";
import helmet from "helmet";
import cookieParser from "cookie-parser";
import swaggerUi from "swagger-ui-express";
import morgan from "morgan";

import swaggerSpec from "./src/swagger/swagger.mjs";
import { errorHandler } from "./src/middlewares/errorHandler.mjs";
import { morganConfig } from "./src/utils/logger.mjs";
import indexRouter from "./src/routes/index.mjs";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(rateLimit(rateLimits));
app.use(cors(corsConfifg));
app.use(helmet());

app.use(
  morgan(morganConfig.format, {
    stream: morganConfig.stream,
  })
);

app.use("/api/v1", indexRouter);

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use(errorHandler);

export default app;
