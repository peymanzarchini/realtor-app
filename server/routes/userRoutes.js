import express from "express";
import {
  handleGoogleAuth,
  handleLoginUser,
  handleRegisterUser,
} from "../controllers/userController.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router.post("/register", upload.single("avatar"), handleRegisterUser);
router.post("/login", handleLoginUser);
router.post("/google", handleGoogleAuth);

export default router;
