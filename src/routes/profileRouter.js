import express from "express";
import { showProfile } from "../controllers/profileController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, showProfile);

export { router as profileRouter };
