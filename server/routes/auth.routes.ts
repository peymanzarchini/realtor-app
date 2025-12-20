import { Router } from "express";
import { register, login, logout, refreshToken } from "../controllers/auth.controller.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: مدیریت ورود، خروج و ثبت نام کاربران
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *   post:
 *     summary: ثبت نام کاربر جدید
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [firstName, lastName, email, password, phoneNumber]
 *             properties:
 *               firstName: { type: string, example: "حمید" }
 *               lastName: { type: string, example: "احمدی" }
 *               email: { type: string, example: "hamid@example.com" }
 *               password: { type: string, example: "12345678" }
 *               phoneNumber: { type: string, example: "09121234567" }
 *               role: { type: string, enum: [client, agent, admin] }
 *     responses:
 *       201:
 *         description: موفق
 */
router.post("/register", register);

/**
 * @swagger
 * /api/v1/auth/login:
 *   post:
 *     summary: ورود به حساب کاربری
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email: { type: string, example: "hamid@example.com" }
 *               password: { type: string, example: "12345678" }
 *     responses:
 *       200:
 *         description: موفق
 */
router.post("/login", login);
/**
 * @swagger
 * /api/v1/auth/refresh:
 *   post:
 *     summary: دریافت اکسس توکن جدید با استفاده از رفرش توکن (Refresh Token)
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: اکسس توکن جدید با موفقیت صادر شد
 *       401:
 *         description: رفرش توکن منقضی یا نامعتبر است
 */
router.post("/refresh", refreshToken);

/**
 * @swagger
 * /api/v1/auth/logout:
 *   post:
 *     summary: خروج
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: موفق
 */
router.post("/logout", logout);

export default router;
