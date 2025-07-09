import swaggerJSDoc from "swagger-jsdoc";
import { default as swaggerAutogen } from "mongoose-to-swagger";
import User from "../models/User.mjs";
import Club from "../models/Club.mjs";
import ClubEvent from "../models/Club.mjs";
import Booking from "../models/Booking.mjs";

import { env } from "../config/env.mjs";

const userSchema = swaggerAutogen(User);
const eventSchema = swaggerAutogen(Club);
const eventSeatingSchema = swaggerAutogen(ClubEvent);
const seatingSchema = swaggerAutogen(Booking);

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Club Booking API",
      version: "1.0.0",
      description: "API docs for login, register, event, and booking",
    },
    servers: [{ url: `http://localhost:${env.PORT}` }],
    components: {
      schemas: {
        User: userSchema,
        Club: eventSchema,
        ClubEvent: eventSeatingSchema,
        Booking: seatingSchema,
      },
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ["./src/routes/*.mjs"],
  basePath: "/api/v1",
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
