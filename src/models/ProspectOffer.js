import mongoose from "mongoose";

const schema = mongoose.Schema({
  user: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  market: {
    type: mongoose.Types.ObjectId,
  },
  years: {
    type: Number,
    required: true,
  },
  proposedInitialPayout: {
    type: Number,
    required: true,
  },
  minimumPayout: {
    type: Number,
    required: true,
  },
  proposedEscrow: {
    type: Number,
    required: true,
  },
  initialFundPayoutDate: {
    type: Date,
    required: true,
  },
  initialContractYearPayoutDate: {
    type: Date,
    required: true,
  },
  tier: [],
  attachments: [],
  tags: [],
  category: {
    type: String,
  },
  projectedRateOfReturnForSponsor: {
    type: Number,
  },
  exp: {
    type: Date,
  },
});

const ProspectOffer = mongoose.model("ProspectOffer", schema);

export { ProspectOffer };
