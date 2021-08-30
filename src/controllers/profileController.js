import expressAsyncHandler from "express-async-handler";
import Kyc from "../models/Kyc.js";

const showProfile = expressAsyncHandler(async (req, res) => {
  const user = req.user;

  const kycData = await Kyc.findOne({ user: user.id });

  const profile = {
    username: user.nickname,
    email: user.email,
  };

  console.log(kycData);

  if (kycData && kycData.basic) {
    profile.firstName = kycData?.basic?.firstName || "";
    profile.lastName = kycData?.basic?.lastName || "";
    profile.country = kycData?.basic?.country || "";
    profile.birthdate = kycData?.basic?.birthdate || null;
  }

  res.json(profile);
});

export { showProfile };
