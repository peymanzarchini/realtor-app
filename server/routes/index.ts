import { Router } from "express";
import authRoutes from "./auth.routes.js";
import propertyRoutes from "./property.routes.js";
import userRoutes from "./user.routes.js";
import featureRoutes from "./feature.routes.js";

const router = Router();

router.use("/api/v1/auth", authRoutes);
router.use("/api/v1/properties", propertyRoutes);
router.use("/api/v1/users", userRoutes);
router.use("/api/v1/features", featureRoutes);

export default router;
