import { Router } from "express";
import { register, login, logout, refreshToken } from "../controllers/auth.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: User registration and authentication management
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: Register a new account
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, email, password, phoneNumber]
 *             properties:
 *               firstName: { type: string, example: "John" }
 *               lastName: { type: string, example: "Smith" }
 *               email: { type: string, example: "john.smith@example.com" }
 *               password: { type: string, example: "securePassword123" }
 *               phoneNumber: { type: string, example: "+1234567890" }
 *               role: { type: string, enum: [client, agent, admin] }
 *     responses:
 *       201:
 *         description: User created successfully
 */
router.post("/register", register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: Authenticate user and receive tokens
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string, example: "john.smith@example.com" }
 *               password: { type: string, example: "securePassword123" }
 *     responses:
 *       200:
 *         description: Login successful, tokens returned
 */
router.post("/login", login);

/**
 * @swagger
 * /api/v1/auth/refresh:
 *   post:
 *     summary: Generate a new access token using a valid refresh token
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Access token refreshed successfully
 *       401:
 *         description: Refresh token is missing or expired
 */
router.post("/refresh", refreshToken);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: Terminate session and clear authentication cookies
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Successfully logged out
 */
router.post("/logout", logout);

export default router;
