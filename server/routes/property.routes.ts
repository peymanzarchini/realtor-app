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

// Public Routes
router.get("/", getProperties);
router.get("/:id", getPropertyById);

// Protected Routes
router.use(authenticate);

router.post("/", authorize(UserRole.AGENT, UserRole.ADMIN), createProperty);

router.put("/:id", authorize(UserRole.AGENT, UserRole.ADMIN), updateProperty);

router.delete("/:id", authorize(UserRole.AGENT, UserRole.ADMIN), deleteProperty);

// Image Upload Route
router.post(
  "/:id/images",
  authorize(UserRole.AGENT, UserRole.ADMIN),
  upload.single("image"),
  addImage
);

export default router;
