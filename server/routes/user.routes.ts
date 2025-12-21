import { Router } from "express";
import { rateAgent, getAgents, getAgentDetails } from "../controllers/userAction.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: Agent profiles, rankings, and feedback
 */

/**
 * @swagger
 * /api/v1/users/agents:
 *   get:
 *     summary: Get a list of agents prioritized by average rating
 *     tags: [Users]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *       - in: query
 *         name: limit
 *         schema: { type: integer, default: 10 }
 *     responses:
 *       200:
 *         description: List of agents with their calculated ratings
 */
router.get("/agents", getAgents);

/**
 * @swagger
 * /api/v1/users/agents/{id}:
 *   get:
 *     summary: View agent profile details and their property inventory
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Detailed agent data and property list retrieved
 *       404:
 *         description: Agent not found
 */
router.get("/agents/:id", getAgentDetails);

/**
 * @swagger
 * /api/v1/users/agents/{id}/rate:
 *   post:
 *     summary: Submit feedback and a star rating for an agent
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [rating]
 *             properties:
 *               rating:
 *                 type: integer
 *                 minimum: 1
 *                 maximum: 5
 *                 example: 5
 *                 description: Star rating between 1 and 5
 *               comment:
 *                 type: string
 *                 example: "Excellent service, very knowledgeable about the market."
 *     responses:
 *       200:
 *         description: Rating submitted successfully
 *       400:
 *         description: Validation error or self-rating attempt
 */
router.post("/agents/:id/rate", authenticate, rateAgent);

export default router;
