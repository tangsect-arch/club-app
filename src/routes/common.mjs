import express from "express";
import {
  fetchEventById,
  fetchEvents,
} from "../controllers/eventController.mjs";
import { fetchClubById, fetchClubs } from "../controllers/clubController.mjs";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Clubs
 *   description: Route to view events and seating
 */

router
  .get("/club", fetchClubs)
  .get("/club/:id", fetchClubById)
  .get("/club/:id/event", fetchEvents)
  .get("/club/:id/event/:eventId", fetchEventById);

export default router;
