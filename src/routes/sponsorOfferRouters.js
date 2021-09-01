import { Router } from "express";
import {
  allOffers,
  createOffer,
  myOffer,
  showOffer,
} from "../controllers/sponsorController.js";
import { investor, protect } from "../middleware/authMiddleware.js";

const router = new Router();

router.post("/api/offers/sponsor", protect, investor, createOffer);
router.get("/api/offers/sponsor", protect, allOffers);
router.get("/api/offers/sponsor/my", protect, investor, myOffer);
router.get("/api/offers/sponsor/:id", protect, showOffer);

export { router as sponsorOfferRouer };
