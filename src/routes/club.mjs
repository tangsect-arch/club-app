import express from "express";
import {
  createClub,
  deleteClub,
  fetchClubById,
  fetchClubs,
  updateClub,
} from "../controllers/clubController.mjs";

const router = express.Router();

/**
 * @swagger
 * components:
 *   schemas:
 *     Club:
 *       type: object
 *       required:
 *         - clubName
 *         - clubType
 *         - contactNumber
 *         - email
 *         - addressLine1
 *         - city
 *         - state
 *         - country
 *         - postalCode
 *         - status
 *         - clubAdmin
 *       properties:
 *         clubName:
 *           type: string
 *         clubType:
 *           type: string
 *           enum: [sports, cultural, academic, social]
 *         contactNumber:
 *           type: string
 *           example: "9876543210"
 *         email:
 *           type: string
 *           example: "club@example.com"
 *         addressLine1:
 *           type: string
 *         addressLine2:
 *           type: string
 *         city:
 *           type: string
 *         state:
 *           type: string
 *         country:
 *           type: string
 *         postalCode:
 *           type: string
 *           example: "600001"
 *         status:
 *           type: string
 *           enum: [pending, active, inactive, suspended]
 *         description:
 *           type: string
 *         website:
 *           type: string
 *         clubAdmin:
 *           type: string
 *         parentClub:
 *           type: string
 */

/**
 * @swagger
 * tags:
 *   - name: Super Admin Clubs
 *     description: Admin routes for managing clubs
 */

/**
 * @swagger
 * /api/v1/superadmin/clubs:
 *   get:
 *     summary: Fetch all clubs
 *     tags: [Super Admin Clubs]
 *     responses:
 *       200:
 *         description: List of clubs
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/superadmin/club:
 *   post:
 *     summary: Create a new club
 *     tags: [Super Admin Clubs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Club'
 *     responses:
 *       201:
 *         description: Club created
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */

/**
 * @swagger
 * /api/v1/superadmin/club/{id}:
 *   get:
 *     summary: Get a club by ID
 *     tags: [Super Admin Clubs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Club details
 *       404:
 *         description: Club not found
 *       500:
 *         description: Server error
 *   put:
 *     summary: Update a club by ID
 *     tags: [Super Admin Clubs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Club'
 *     responses:
 *       200:
 *         description: Club updated
 *       404:
 *         description: Club not found
 *       500:
 *         description: Server error
 *   delete:
 *     summary: Delete a club by ID
 *     tags: [Super Admin Clubs]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Club deleted
 *       404:
 *         description: Club not found
 *       500:
 *         description: Server error
 */

router.get("/clubs", fetchClubs);
router.get("/club/:id", fetchClubById);
router.post("/club", createClub);
router.put("/club/:id", updateClub);
router.delete("/club/:id", deleteClub);

export default router;
