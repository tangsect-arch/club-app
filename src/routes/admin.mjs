import express from "express";
import {
  createEvent,
  createEventSeating,
  deleteEvent,
  fetchEvents,
  fetchEventById,
  updateEvent,
  updateEventSeating,
} from "../controllers/eventController.mjs";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Admin Events
 *   description: Route to manage events and event seating
 */

router
  .get("/event", fetchEvents)
  .post("/event", createEvent)
  .put("/event/:id", updateEvent)
  .delete("/event/:id", deleteEvent)
  .post("/event/:id/seating", createEventSeating)
  .put("/event/:id/seating/:seatingId", updateEventSeating);

export default router;
