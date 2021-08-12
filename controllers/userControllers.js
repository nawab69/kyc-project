import expressAsyncHandler from "express-async-handler";
import User from "../models/User.js";
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
  const { nickname, email, password, walletPassword } = req.body;

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
    user.isAdmin = req.body.isAdmin || false;
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
