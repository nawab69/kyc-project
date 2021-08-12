import expressAsyncHandler from "express-async-handler";
import Kyc from "../models/Kyc.js";
import moment from "moment";

export const submitKyc = expressAsyncHandler(async (req, res) => {
  const user = req.user;
  const { step } = req.body;
  let kyc = await Kyc.findOne({ user: user._id });
  if (!kyc) {
    await Kyc.create({ user: user._id });
    kyc = await Kyc.findOne({ user: user._id });
  }
  if (step === "basic") {
    const status = kyc.basic.status;
    if (status === "not verified" || status === "cancelled") {
      const { firstName, lastName, country, birthdate } = req.body;
      const dateMomentObject = moment(birthdate, "DD/MM/YYYY"); // 1st argument - string, 2nd argument - format
      const date = dateMomentObject.toDate();
      if (firstName && lastName && country && birthdate) {
        kyc.basic.firstName = firstName;
        kyc.basic.lastName = lastName;
        kyc.basic.country = country;
        kyc.basic.birthdate = date;
        kyc.basic.status = "requested";
        kyc.save();
      } else {
        throw new Error("Please fill all Basic field");
      }
    } else {
      throw new Error("Already submitted");
    }
  } else if (step === "intermediate") {
    if (kyc.basic.status !== "verified") {
      throw new Error("Please verify the basic step first");
    }
    const status = kyc.intermediate.status;
    if (status === "not verified" || status === "cancelled") {
      const { cardNo, cardType } = req.body;
      if (cardNo && cardType) {
        kyc.intermediate.cardNo = cardNo;
        kyc.intermediate.cardType = cardType;
        kyc.intermediate.status = "requested";
        kyc.save();
      } else {
        throw new Error("Please fill all Intermediate field");
      }
    } else {
      throw new Error("Already submitted");
    }
  } else if (step === "advance") {
    if (kyc.intermediate.status !== "verified") {
      throw new Error("Please verify the intermadiate step first");
    }
    const status = kyc.advance.status;
    if (status === "not verified" || status === "cancelled") {
      const { presentAddress, parmanentAddress, city, state, zip } = req.body;
      if ((presentAddress, parmanentAddress, city, state, zip)) {
        kyc.advance.presentAddress = presentAddress;
        kyc.advance.parmanentAddress = parmanentAddress;
        kyc.advance.city = city;
        kyc.advance.state = state;
        kyc.advance.zip = zip;
        kyc.advance.status = "requested";
        kyc.save();
      } else {
        throw new Error("Please fill all Advance field");
      }
    } else {
      throw new Error("Already submitted");
    }
  } else {
    throw new Error("Please specify the correct step");
  }
  res.json({ message: "Document Submitted" });
});

export const myVerificationLevel = expressAsyncHandler(async (req, res) => {
  const { user } = req;
  const kyc = await Kyc.findOne({ user: user._id });
  let level = "no level";
  if (kyc && kyc.basic.status === "verified") level = "basic";
  if (kyc && kyc.intermediate.status === "verified") level = "intermediate";
  if (kyc && kyc.advance.status === "verified") level = "advance";
  res.json({ level });
});

export const allKyc = expressAsyncHandler(async (req, res) => {
  const kyc = await Kyc.find();
  res.json(kyc);
});

export const singleKyc = expressAsyncHandler(async (req, res) => {
  const user = req.params.user;
  const kyc = await Kyc.findOne({ user: user });
  res.json(kyc);
});

export const verifyKyc = expressAsyncHandler(async (req, res) => {
  const user = req.params.user;
  const kyc = await Kyc.findOne({ user: user });

  switch ("requested") {
    case kyc.basic.status:
      kyc.basic.status = "verified";
      kyc.save();
      break;
    case kyc.intermediate.status:
      kyc.intermediate.status = "verified";
      kyc.save();
      break;
    case kyc.advance.status:
      kyc.advance.status = "verified";
      kyc.save();
      break;
    default:
      throw new Error("User did not submit for verification");
  }

  res.json(kyc);
});

export const cancelKyc = expressAsyncHandler(async (req, res) => {
  const user = req.params.user;
  const kyc = await Kyc.findOne({ user: user });

  switch ("requested") {
    case kyc.basic.status:
      kyc.basic.status = "cancelled";
      kyc.save();
      break;
    case kyc.intermediate.status:
      kyc.intermediate.status = "cancelled";
      kyc.save();
      break;
    case kyc.advance.status:
      kyc.advance.status = "cancelled";
      kyc.save();
      break;
    default:
      throw new Error("User did not submit for verification");
  }

  res.json(kyc);
});
