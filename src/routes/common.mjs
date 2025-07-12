import express from "express";
import {
  fetchEventByClubIdAndEventId,
  fetchEventsByClubId,
  fetchEvents,
  fetchEventByEventId,
} from "../controllers/eventController.mjs";
import { fetchClubById, fetchClubs } from "../controllers/clubController.mjs";

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Clubs
 *   description: Routes to view clubs and their events
 */

/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Routes to view and filter events
 */

/**
 * @swagger
 * /api/v1/common/clubs:
 *   get:
 *     summary: Get all clubs
 *     tags: [Clubs]
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
 *         description: List of clubs
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/common/clubs/{id}:
 *   get:
 *     summary: Get a specific club by ID
 *     tags: [Clubs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Club ID
 *     responses:
 *       200:
 *         description: Club details
 *       404:
 *         description: Club not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/common/events:
 *   get:
 *     summary: Get all events with optional filters and pagination
 *     tags: [Events]
 *     parameters:
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by event name
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter by city
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter events starting from this date (YYYY-MM-DD)
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter events ending before this date (YYYY-MM-DD)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of events per page
 *     responses:
 *       200:
 *         description: List of filtered events
 *       400:
 *         description: Invalid filters
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/common/events/{eventId}:
 *   get:
 *     summary: Get a specific event by event ID
 *     tags: [Events]
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event details
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/common/clubs/{id}/events:
 *   get:
 *     summary: Get all events for a specific club with filters and pagination
 *     tags: [Clubs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Club ID
 *       - in: query
 *         name: name
 *         schema:
 *           type: string
 *         description: Filter by event name
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         description: Filter by city
 *       - in: query
 *         name: fromDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter start date (YYYY-MM-DD)
 *       - in: query
 *         name: toDate
 *         schema:
 *           type: string
 *           format: date
 *         description: Filter end date (YYYY-MM-DD)
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of results per page
 *     responses:
 *       200:
 *         description: Events for the club
 *       404:
 *         description: No events found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/v1/common/clubs/{id}/events/{eventId}:
 *   get:
 *     summary: Get specific event details for a club
 *     tags: [Clubs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: Club ID
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: Event ID
 *     responses:
 *       200:
 *         description: Event details
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */

router.get("/clubs", fetchClubs);
router.get("/clubs/:id", fetchClubById);
router.get("/clubs/:id/events", fetchEventsByClubId);
router.get("/clubs/:id/events/:eventId", fetchEventByClubIdAndEventId);
router.get("/events", fetchEvents);
router.get("/events/:eventId", fetchEventByEventId);

export default router;
