import mongoose from "mongoose";
import pkg from "bcryptjs";
const { compare, genSalt, hash } = pkg;

const userSchema = mongoose.Schema(
  {
    nickname: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "moderator", "admin", "banned"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

//   @ MIDDLEWARES

userSchema.methods.matchPassword = async function (enteredPassword) {
  return await compare(enteredPassword, this.password);
};
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await genSalt(10);
  this.password = await hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);
export default User;
