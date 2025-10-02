import express from "express";
import UserController from "../controllers/user.controller.js";
import { verifyUser } from "../middlewares/verifyUser.js";

const router = express.Router();

router.get("/logout", UserController.logoutUser);
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.put("/update/:id", verifyUser, UserController.updateUser);

export default router;
