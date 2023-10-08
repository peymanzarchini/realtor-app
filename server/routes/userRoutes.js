import express from "express";
import { handleRegisterUser } from "../controllers/userController.js";
import { upload } from "../utils/multer.js";

const router = express.Router();

router.post("/register", upload.single("avatar"), handleRegisterUser);

export default router;
