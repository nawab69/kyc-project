import expressAsyncHandler from "express-async-handler";
import pkg from "jsonwebtoken";
import User from "../models/User.js";
const { verify } = pkg;

export const protect = expressAsyncHandler(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      if (!token) {
        throw new Error("Invalid token");
      } else {
        const decoded = verify(token, process.env.JWT_SECRET);

        req.user = await User.findById(decoded.id).select("-password");

        next();
      }
    } catch (error) {
      res.status(401);
      res.send("token error");
    }
  } else {
    throw new Error("You are not logged in");
  }
});

export const BanProtection = expressAsyncHandler(async (req, res, next) => {
  if (req.user && req.user.role !== "banned") {
    next();
  } else {
    res.status(401);
    throw new Error("You are banned. Please contact with admin");
  }
});

export const admin = expressAsyncHandler(async (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(401);
    throw new Error("Authorization failed as admin");
  }
});

export const moderator = expressAsyncHandler(async (req, res, next) => {
  if (
    req.user &&
    (req.user.role === "moderator" || req.user.role === "admin")
  ) {
    next();
  } else {
    res.status(401);
    throw new Error("Authorization failed as moderator or admin");
  }
});

export const changeRoleTo = expressAsyncHandler(async (req, res, next) => {});
