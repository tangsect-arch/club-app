import express from "express";
import {
  createEvent,
  deleteEvent,
  fetchEvents,
  fetchEventByEventId,
  updateEvent,
} from "../controllers/eventController.mjs";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       required:
 *         - eventName
 *         - eventStartDate
 *         - eventEndDate
 *         - startTime
 *         - duration
 *         - address
 *         - city
 *         - seatCount
 *         - availableSeats
 *         - bookedSeats
 *         - amountPerSeat
 *         - maxBookingPerUser
 *         - clubId
 *       properties:
 *         eventName:
 *           type: string
 *         eventStartDate:
 *           type: string
 *           format: date
 *         eventEndDate:
 *           type: string
 *           format: date
 *         startTime:
 *           type: string
 *           example: "14:00"
 *         duration:
 *           type: number
 *           example: 4
 *         address:
 *           type: string
 *         city:
 *           type: string
 *         description:
 *           type: string
 *         seatCount:
 *           type: number
 *         availableSeats:
 *           type: number
 *         bookedSeats:
 *           type: number
 *         amountPerSeat:
 *           type: number
 *         maxBookingPerUser:
 *           type: number
 *         clubId:
 *           type: string
 *         status:
 *           type: string
 *           enum: [active, inactive]
 *     Booking:
 *       type: object
 *       required:
 *         - seatCapacity
 *         - pricePerSeat
 *         - seatingType
 *       properties:
 *         seatCapacity:
 *           type: number
 *         pricePerSeat:
 *           type: number
 *         seatingType:
 *           type: string
 */

/**
 * @swagger
 * /api/v1/admin/event:
 *   get:
 *     summary: Fetch all events
 *     tags: [Admin Events]
 *     responses:
 *       200:
 *         description: List of events
 *       500:
 *         description: Server error
 *   post:
 *     summary: Create a new event
 *     tags: [Admin Events]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       201:
 *         description: Event created
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 *
 * /api/v1/admin/event/{eventId}:
 *   get:
 *     summary: fetch an event
 *     tags: [Admin Events]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Event fetched
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update an event
 *     tags: [Admin Events]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Event'
 *     responses:
 *       200:
 *         description: Event updated
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete an event
 *     tags: [Admin Events]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event deleted
 *       404:
 *         description: Event not found
 *       500:
 *         description: Server error
 */

router
  .get("/event", fetchEvents)
  .get("/event/:eventId", fetchEventByEventId)
  .post("/event", createEvent)
  .put("/event/:eventId", updateEvent)
  .delete("/event/:eventId", deleteEvent);

export default router;
