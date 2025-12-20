import { Router } from "express";
import authRoutes from "./auth.routes.js";
import propertyRoutes from "./property.routes.js";

const router = Router();

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/properties", propertyRoutes);

export default router;
