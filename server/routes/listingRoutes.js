import express from "express";
import {
  createListing,
  deleteListing,
  getListing,
  updateListing,
} from "../controllers/listingController.js";
import { verifyToken } from "../middlewares/verifyUser.js";

const router = express.Router();

router.post("/create", verifyToken, createListing);
router.delete("/delete/:id", verifyToken, deleteListing);
router.post("/update/:id", verifyToken, updateListing);
router.get("/getlisting/:id", getListing);

export default router;
