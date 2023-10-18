import express from "express";
import {
  handleGoogleAuth,
  handleLoginUser,
  handleRegisterUser,
  updateUser,
} from "../controllers/userController.js";
// import { profileImageResize, uploadImage } from "../utils/multer.js";
import { verifyToken } from "../middlewares/verifyUser.js";

const router = express.Router();

router.post("/register", handleRegisterUser);
router.post("/login", handleLoginUser);
router.post("/google", handleGoogleAuth);
router.post("/update/:id", verifyToken, updateUser);

export default router;
