import express from "express";
import {
  deleteUser,
  handleGoogleAuth,
  handleLoginUser,
  handleRegisterUser,
  updateUser,
} from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyUser.js";

const router = express.Router();

router.post("/register", handleRegisterUser);
router.post("/login", handleLoginUser);
router.post("/google", handleGoogleAuth);
router.post("/update/:id", verifyToken, updateUser);
router.delete("/delete/:id", verifyToken, deleteUser);

export default router;
