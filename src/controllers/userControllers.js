import expressAsyncHandler from "express-async-handler";
import passwordResetMail from "../mail/passwordResetMail.js";
import PasswordReset from "../models/PasswordReset.js";
import User from "../models/User.js";
import { encryptData } from "../utils/Encryption.js";
import { createWallet } from "../utils/ethereum/index.js";
import JWT from "../utils/JWT.js";

export const authUser = expressAsyncHandler(async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne().or([
    { email: username },
    { nickname: username },
  ]);
  console.log(user);
  if (user && (await user.matchPassword(password))) {
    res.status(201).json({
      _id: user._id,
      nickname: user.nickname,
      email: user.email,
      role: user.role,
      isAdmin: user.isAdmin,
      token: JWT(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

export const registerUser = expressAsyncHandler(async (req, res) => {
  const { nickname, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400).json({
      message: "User already exists",
    });
  } else {
    const user = await User.create({
      nickname,
      email,
      password,
    });

    if (user) {
      await createWallet(user._id);
      res.status(201).json({
        _id: user._id,
        nickname: user.nickname,
        email: user.email,
        isAdmin: user.isAdmin,
        token: JWT(user._id),
        message: "Created Succesfully",
      });
    } else {
      res.status(400).json({
        message: "Invalid user data",
      });
    }
  }
});

export const getAllUsers = expressAsyncHandler(async (req, res) => {
  const pageSize = 3;
  const page = Number(req.query.page) || 1;

  const keyword = req.query.status
    ? {
        status: req.query.status,
      }
    : {};

  const count = await User.countDocuments({ ...keyword });
  const users = await User.find({ ...keyword })
    .sort("-updatedAt")
    .limit(pageSize)
    .skip(pageSize * (page - 1));

  res.json({ users, page, pages: Math.ceil(count / pageSize) });
});

export const getUserById = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.params.email }).select(
    "-password"
  );
  if (user) {
    res.json(user);
  } else {
    res.status(401);
    throw new Error("User not Found");
  }
});

export const deleteUser = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (user) {
    await user.remove();
    res.json({ message: "User removed" });
  } else {
    res.status(404);
    throw new Error("User not Found");
  }
});

export const userUpdate_admin = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.params.email });
  if (user) {
    user.nickname = req.body.nickname || user.nickname;
    user.email = req.body.email || user.email;
    user.save();
    res.json({
      id: user._id,
      nickname: user.nickname,
      email: user.email,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export const updatePassword = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.user.email });
  console.log({ user });
  const { prevPassword, newPassword } = req.body;

  if (user) {
    if (await user.matchPassword(prevPassword)) {
      user.password = newPassword;
      user.save();
      res.json({ message: "Password updated successfully" });
    } else {
      throw new Error("Invalid prev Password");
    }
  } else {
    throw new Error("User not found");
  }
});

export const forgotPassword = expressAsyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (user) {
    const resetPassword = await PasswordReset.findOne({ user: user._id });
    const generateCode = Math.floor(100000 + Math.random() * 900000);
    const token = await encryptData(
      user._id.toString(),
      generateCode.toString()
    );
    if (resetPassword) {
      await resetPassword.delete();
    }
    await PasswordReset.create({
      user: user._id,
      code: token,
    });
    passwordResetMail(user.email, token);
    res.json({ message: "A code has been sent" });
  } else {
    res.json({ message: "A code has been sent" });
  }
});

export const resetPassword = expressAsyncHandler(async (req, res) => {
  const { token, password } = req.body;
  const resetData = await PasswordReset.findOne({ code: token });
  if (resetData) {
    const user = await User.findById(resetData.user);
    user.password = password;
    await user.save();
    resetData.delete();
    res.json({ message: "Password changed successfully" });
  } else {
    res.status(404);
    throw new Error("Link expired or not found");
  }
});

// @method : resgisterAsProspect
// @info : existing user can update his role to prospect

export const registerAsProspect = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.role = "prospect";
  user.save();
  res.json(user);
});

// @method : resgisterAsInvestor
// @info : existing user can update his role to investor
export const registerAsInvestor = expressAsyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  user.role = "investor";
  user.save();
  res.json(user);
});
