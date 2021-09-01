import { Router } from "express";
import {
  allOffers,
  createOffer,
  myOffer,
  showOffer,
} from "../controllers/prospectController.js";
import { prospect, protect } from "../middleware/authMiddleware.js";

const router = new Router();

router.post("/api/offers/prospect", protect, prospect, createOffer);
router.get("/api/offers/prospect", protect, allOffers);
router.get("/api/offers/prospect/my", protect, myOffer);
router.get("/api/offers/prospect/:id", protect, showOffer);

export { router as prospectOfferRouter };
