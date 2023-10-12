import express from "express";
import {
  handleGoogleAuth,
  handleLoginUser,
  handleRegisterUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", handleRegisterUser);
router.post("/login", handleLoginUser);
router.post("/google", handleGoogleAuth);

export default router;
