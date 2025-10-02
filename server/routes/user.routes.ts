import express from "express";
import UserController from "../controllers/user.controller.js";

const router = express.Router();

router.get("/logout", UserController.logoutUser);
router.post("/register", UserController.registerUser);
router.post("/login", UserController.loginUser);
router.put("/update/:id", UserController.updateUser);

export default router;
