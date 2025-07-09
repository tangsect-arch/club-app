import express from "express";
import {
  createBooking,
  cancelBooking,
  fetchBookingById,
  fetchBookings,
  updateBooking,
} from "../controllers/userController.mjs";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User Bookings
 *   description: Route to manage Bookings and Events for Users
 */

router
  .get("/bookings", fetchBookings)
  .get("/bookings/:id", fetchBookingById)
  .post("/event/:id/eventseating/:seatingId/booking", createBooking)
  .put("/event/:id/eventseating/:seatingId/booking/:bookingId", updateBooking)
  .patch(
    "/event/:id/eventseating/:seatingId/booking/:bookingId",
    cancelBooking
  );

export default router;
