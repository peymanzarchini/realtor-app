import { Router } from "express";
import { listFeatures } from "../controllers/feature.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Features
 *   description: Global amenities catalog
 */

/**
 * @swagger
 * /api/v1/features:
 *   get:
 *     summary: Get all available features (Parking, Pool, etc.)
 *     tags: [Features]
 *     responses:
 *       200:
 *         description: List of features retrieved
 */
router.get("/", listFeatures);

export default router;
