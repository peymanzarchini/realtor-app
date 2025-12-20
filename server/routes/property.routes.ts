import { Router } from "express";
import {
  createProperty,
  getProperties,
  getPropertyById,
  addImage,
  deleteProperty,
  updateProperty,
} from "../controllers/property.controller.js";
import { authenticate, authorize } from "../middlewares/auth.middleware.js";
import { upload } from "../config/multer.js";
import { UserRole } from "../constants/roles.js";

const router = Router();

/**
 * @swagger
 * /api/v1/properties:
 *   get:
 *     summary: جستجو و فیلتر پیشرفته املاک
 *     tags: [Properties]
 *     parameters:
 *       - in: query
 *         name: search
 *         description: جستجو در عنوان، توضیحات یا آدرس
 *         schema: { type: string }
 *       - in: query
 *         name: sortBy
 *         description: فیلد مورد نظر برای مرتب‌سازی (price, area, createdAt)
 *         schema: { type: string, example: "price" }
 *       - in: query
 *         name: sortOrder
 *         schema: { type: string, enum: [ASC, DESC] }
 *       - in: query
 *         name: minPrice
 *         schema: { type: number }
 *       - in: query
 *         name: minArea
 *         description: حداقل متراژ
 *         schema: { type: integer }
 *       - in: query
 *         name: propertyType
 *         schema: { type: string, enum: [apartment, villa, office, land, shop] }
 *       - in: query
 *         name: page
 *         schema: { type: integer, default: 1 }
 *     responses:
 *       200:
 *         description: موفق
 */
router.get("/", getProperties);

/**
 * @swagger
 * /api/v1/properties/{id}:
 *   get:
 *     summary: دریافت جزئیات یک ملک با شناسه
 *     tags: [Properties]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200:
 *         description: جزئیات ملک
 *       404:
 *         description: ملک یافت نشد
 */
router.get("/:id", getPropertyById);

// Protected Routes
router.use(authenticate);

/**
 * @swagger
 * /api/v1/properties:
 *   post:
 *     summary: ثبت ملک جدید (نیاز به توکن Agent/Admin)
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
 *         description: ملک ثبت شد
 */
router.post("/", authorize(UserRole.AGENT, UserRole.ADMIN), createProperty);

/**
 * @swagger
 * /api/v1/properties/{id}:
 *   put:
 *     summary: ویرایش ملک
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
 *         description: ملک بروزرسانی شد
 */
router.put("/:id", authorize(UserRole.AGENT, UserRole.ADMIN), updateProperty);

/**
 * @swagger
 * /api/v1/properties/{id}:
 *   delete:
 *     summary: حذف ملک
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
 *         description: ملک حذف شد
 */
router.delete("/:id", authorize(UserRole.AGENT, UserRole.ADMIN), deleteProperty);

/**
 * @swagger
 * /api/v1/properties/{id}/images:
 *   post:
 *     summary: آپلود تصویر برای ملک
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
 *         description: تصویر با موفقیت آپلود شد
 */
router.post(
  "/:id/images",
  authorize(UserRole.AGENT, UserRole.ADMIN),
  upload.single("image"),
  addImage
);

export default router;
