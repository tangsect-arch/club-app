import swaggerJSDoc from "swagger-jsdoc";
import { default as swaggerAutogen } from "mongoose-to-swagger";
import User from "../models/User.mjs";
import Club from "../models/Club.mjs";
import Event from "../models/Event.mjs"; // ✅ Correct import
import Booking from "../models/Booking.mjs";
import { env } from "../config/env.mjs";

const userSchema = swaggerAutogen(User);
const clubSchema = swaggerAutogen(Club); // ✅ Club schema
const eventSchema = swaggerAutogen(Event); // ✅ Event schema
const bookingSchema = swaggerAutogen(Booking);

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
        Club: clubSchema,
        Event: eventSchema,
        Booking: bookingSchema,
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
  apis: ["./src/routes/*.mjs"], // Ensure this path is correct
};

const swaggerSpec = swaggerJSDoc(options);
export default swaggerSpec;
