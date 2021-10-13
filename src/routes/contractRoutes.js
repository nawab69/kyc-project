import express from "express";
import expressAsyncHandler from "express-async-handler";
import { protect } from "../middleware/authMiddleware.js";
import { PeopleFuture } from "../utils/smart-contract/peopleFuture.js";

const router = express.Router();

router.post(
  "/initializeNewContract",
  protect,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const contract = new PeopleFuture(user.id);
    await contract.init();

    const {
      sponsor,
      prospect,
      prompti,
      totalPayment,
      escrowPayment,
      feePercent,
      numberOfYears,
      firstYear,
      projectedEarnings,
      baseEscrowBalance,
    } = req.body;

    const tx = await contract.initializeNewContract(
      sponsor,
      prospect,
      prompti,
      totalPayment,
      escrowPayment,
      feePercent,
      numberOfYears,
      firstYear,
      projectedEarnings,
      baseEscrowBalance
    );

    res.json(tx);
  })
);

router.post(
  "/initializeValues",
  protect,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const contract = new PeopleFuture(user.id);
    await contract.init();

    const {
      contractId,
      tierOnePercent,
      tierTwoPercent,
      tierThreePercent,
      tierTwoMinimum,
      tierThreeMinimum,
      minimumPayout,
    } = req.body;

    const tx = await contract.initializeValues(
      contractId,
      tierOnePercent,
      tierTwoPercent,
      tierThreePercent,
      tierTwoMinimum,
      tierThreeMinimum,
      minimumPayout
    );

    res.json(tx);
  })
);

router.post(
  "/initialPayment",
  protect,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const contract = new PeopleFuture(user.id);
    await contract.init();

    const { contractId, value } = req.body;

    const tx = await contract.initialPayment(contractId, value);

    res.json(tx);
  })
);
router.post(
  "/reportEarnings",
  protect,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const contract = new PeopleFuture(user.id);
    await contract.init();

    const { contractId, earnings } = req.body;

    const tx = await contract.reportEarnings(contractId, earnings);

    res.json(tx);
  })
);
router.post(
  "/verifyEarningsReport",
  protect,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const contract = new PeopleFuture(user.id);
    await contract.init();

    const { contractId, earnings } = req.body;

    const tx = await contract.verifyEarningsReport(contractId, earnings);

    res.json(tx);
  })
);
router.post(
  "/payPortionOfEarnings",
  protect,
  expressAsyncHandler(async (req, res) => {
    const user = req.user;
    const contract = new PeopleFuture(user.id);
    await contract.init();

    const { contractId, payout } = req.body;

    const tx = await contract.payPortionOfEarnings(contractId, payout);

    res.json(tx);
  })
);

export { router as contractRouter };
