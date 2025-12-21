import { Router } from "express";
import {
  createProperty,
  getProperties,
  getPropertyById,
  addImage,
  deleteProperty,
  updateProperty,
} from "../controllers/property.controller.js";
import { toggleFavorite } from "../controllers/userAction.controller.js";
import { updatePropertyFeatures } from "../controllers/feature.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { upload } from "../config/multer.js";
import { UserRole } from "../constants/roles.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Properties
 *   description: Real estate listings and management
 */

/**
 * @swagger
 * /api/v1/properties:
 *   get:
 *     summary: Search and filter properties with pagination
 *     tags: [Properties]
 *     parameters:
 *       - in: query
 *         name: search
 *         schema: { type: string }
 *         description: Search by title, description, or address
 *       - in: query
 *         name: sortBy
 *         schema: { type: string, enum: [price, area, createdAt], default: "createdAt" }
 *       - in: query
 *         name: sortOrder
 *         schema: { type: string, enum: [ASC, DESC], default: "DESC" }
 *       - in: query
 *         name: propertyType
 *         schema: { type: string, enum: [apartment, villa, office, land, shop] }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *     responses:
 *       200:
 *         description: Successfully retrieved property list
 */
router.get("/", getProperties);

/**
 * @swagger
 * /api/v1/properties/{id}:
 *   get:
 *     summary: Get detailed information for a specific property
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Property details including agent, images, and features
 *       404:
 *         description: Property not found
 */
router.get("/:id", getPropertyById);

// --- Protected Routes (Authentication Required) ---
router.use(authenticate);

/**
 * @swagger
 * /api/v1/properties/{id}/favorite:
 *   post:
 *     summary: Toggle property in user's favorite list
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Favorite status updated
 */
router.post("/:id/favorite", toggleFavorite);

/**
 * @swagger
 * /api/v1/properties:
 *   post:
 *     summary: List a new property (Agent/Admin Only)
 *     security:
 *       - bearerAuth: []
 *     tags: [Properties]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Property'
 *     responses:
 *       201:
 *         description: Property created successfully
 */
router.post("/", authorize(UserRole.AGENT, UserRole.ADMIN), createProperty);

/**
 * @swagger
 * /api/v1/properties/{id}:
 *   put:
 *     summary: Update an existing property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Property'
 *     responses:
 *       200:
 *         description: Property updated
 */
router.put("/:id", authorize(UserRole.AGENT, UserRole.ADMIN), updateProperty);

/**
 * @swagger
 * /api/v1/properties/{id}:
 *   delete:
 *     summary: Delete a property listing
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: Property deleted successfully
 */
router.delete("/:id", authorize(UserRole.AGENT, UserRole.ADMIN), deleteProperty);

/**
 * @swagger
 * /api/v1/properties/{id}/features:
 *   post:
 *     summary: Assign multiple features (amenities) to a property
 *     tags: [Properties]
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
 *             required: [featureIds]
 *             properties:
 *               featureIds:
 *                 type: array
 *                 items: { type: integer }
 *                 example: [1, 2, 4]
 *                 description: Array of feature IDs to be linked to this property
 *     responses:
 *       200:
 *         description: Property features updated
 */
router.post("/:id/features", authorize(UserRole.AGENT, UserRole.ADMIN), updatePropertyFeatures);

/**
 * @swagger
 * /api/v1/properties/{id}/images:
 *   post:
 *     summary: Upload and attach an image to a property
 *     tags: [Properties]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               image:
 *                 type: string
 *                 format: binary
 *               isCover:
 *                 type: string
 *                 example: "true"
 *     responses:
 *       201:
 *         description: Image uploaded successfully
 */
router.post(
  "/:id/images",
  authorize(UserRole.AGENT, UserRole.ADMIN),
  upload.single("image"),
  addImage
);

export default router;
