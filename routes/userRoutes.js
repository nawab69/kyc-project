import express from "express";
import {
  authUser,
  deleteUser,
  forgotPassword,
  getAllUsers,
  getUserById,
  registerUser,
  resetPassword,
  updatePassword,
  userUpdate_admin,
} from "../controllers/userControllers.js";
import { protect, admin, moderator } from "../middleware/authMiddleware.js";
import { rateLimitMiddleware } from "../middleware/rateLimitMiddleware.js";
const userRouter = express.Router();
userRouter.route("/").post(registerUser).get(protect, moderator, getAllUsers);
userRouter.route("/login").post(authUser);

userRouter.put("/change-password", protect, updatePassword);
userRouter.post("/forgot-password", rateLimitMiddleware, forgotPassword);
userRouter.post("/reset-password", resetPassword);
userRouter
  .route("/:email")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, userUpdate_admin);

export default userRouter;
