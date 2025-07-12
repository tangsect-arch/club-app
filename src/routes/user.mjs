import express from "express";
import {
  createBooking,
  cancelBooking,
  updateBooking,
  fetchBookingsByUserId,
} from "../controllers/bookingController.mjs";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: User Bookings
 *   description: Route to manage Bookings and Events for Users
 */

/**
 * @swagger
 * /api/v1/user/bookings:
 *   get:
 *     summary: Get all bookings for the logged-in user
 *     tags: [User Bookings]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number for pagination
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: List of bookings
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/user/bookings/{id}:
 *   get:
 *     summary: Get a specific booking by ID
 *     tags: [User Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking details
 *       404:
 *         description: Booking not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/user/event/{id}/booking:
 *   post:
 *     summary: Create a new booking for an event
 *     tags: [User Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               seatCount:
 *                 type: integer
 *                 example: 2
 *               clubId:
 *                 type: string
 *                 example: 64ffb7a9d15b9a2a340d1234
 *     responses:
 *       201:
 *         description: Booking created successfully
 *       400:
 *         description: Validation error or not enough seats
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/user/event/{id}/booking/{bookingId}:
 *   put:
 *     summary: Update seat count for a booking
 *     tags: [User Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               seatCount:
 *                 type: integer
 *                 example: 3
 *     responses:
 *       200:
 *         description: Booking updated successfully
 *       400:
 *         description: Not enough seats
 *       404:
 *         description: Booking not found
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/user/event/{id}/booking/{bookingId}:
 *   patch:
 *     summary: Cancel a booking
 *     tags: [User Bookings]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *       - in: path
 *         name: bookingId
 *         required: true
 *         schema:
 *           type: string
 *         description: Booking ID
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 *       404:
 *         description: Booking not found
 *       400:
 *         description: Booking already cancelled
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal server error
 */

router
  .get("/bookings", fetchBookingsByUserId)
  .post("/event/:id/booking", createBooking)
  .put("/event/:id/booking/:bookingId", updateBooking)
  .patch("/event/:id/booking/:bookingId", cancelBooking);

export default router;
