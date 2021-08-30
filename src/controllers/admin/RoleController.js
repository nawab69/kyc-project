import expressAsyncHandler from "express-async-handler";
import User from "../../models/User.js";

export const changeRole = expressAsyncHandler(async (req, res) => {
  const userId = req.params.id;
  const { role } = req.body;
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  user.role = role;

  await user.save();

  res.json({
    message: "User role updated successfully",
  });
});
