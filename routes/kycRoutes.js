import express from "express";
import {
  allKyc,
  cancelKyc,
  myVerificationLevel,
  singleKyc,
  submitKyc,
  verifyKyc,
} from "../controllers/kycController.js";
import { moderator, protect } from "../middleware/authMiddleware.js";

const kycRouter = express.Router();

kycRouter.post("/submit", protect, submitKyc);
kycRouter.get("/status", protect, myVerificationLevel);

kycRouter.get("/", protect, moderator, allKyc);
kycRouter.get("/:user", protect, moderator, singleKyc);
kycRouter.put("/:user/verify", protect, moderator, verifyKyc);
kycRouter.put("/:user/cancel", protect, moderator, cancelKyc);
export default kycRouter;
