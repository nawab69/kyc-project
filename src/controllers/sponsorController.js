import expressAsyncHandler from "express-async-handler";
import { SponsorOffer } from "../models/SponsorOffer.js";

const createOffer = expressAsyncHandler(async (req, res) => {
  const {
    market,
    years,
    proposedInitialPayout,
    minimumPayout,
    proposedEscrow,
    initialFundPayoutDate,
    initialContractYearPayoutDate,
    tier,
    attachments,
    tags,
    category,
    exp,
  } = req.body;

  const offers = await SponsorOffer.create({
    market,
    years,
    proposedInitialPayout,
    minimumPayout,
    proposedEscrow,
    initialFundPayoutDate,
    initialContractYearPayoutDate,
    tier,
    attachments,
    tags,
    category,
    exp,
  });

  res.json(offers);
});

const allOffers = expressAsyncHandler(async (req, res) => {
  const offers = await SponsorOffer.find();
  res.send(offers);
});

const showOffer = expressAsyncHandler(async (req, res) => {
  const { id } = req.params;
  const offer = await SponsorOffer.findById(id);
  res.send(offer);
});

const myOffer = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  const offers = await SponsorOffer.find({ user: user._id });
  res.send(offers);
});

export { createOffer, allOffers, showOffer, myOffer };
