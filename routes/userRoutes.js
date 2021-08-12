import express from "express";
import {
  authUser,
  deleteUser,
  getAllUsers,
  getUserById,
  registerUser,
  userUpdate_admin,
} from "../controllers/userControllers.js";
import { protect, admin, moderator } from "../middleware/authMiddleware.js";
const userRouter = express.Router();
userRouter.route("/").post(registerUser).get(protect, moderator, getAllUsers);
userRouter.route("/login").post(authUser);

userRouter
  .route("/:email")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserById)
  .put(protect, admin, userUpdate_admin);

export default userRouter;
