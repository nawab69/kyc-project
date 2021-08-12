import mongoose from "mongoose";

const kycSchema = mongoose.Schema(
  {
    user: {
      ref: "User",
      type: mongoose.Types.ObjectId,
    },
    basic: {
      firstName: {
        type: String,
      },
      lastName: {
        type: String,
      },
      country: {
        type: String,
      },
      birthdate: {
        type: Date,
      },
      status: {
        type: String,
        enum: ["not verified", "requested", "verified", "cancelled"],
        default: "not verified",
      },
      attatchment: [],
    },
    intermediate: {
      cardNo: {
        type: String,
      },
      cardType: {
        type: String,
        enum: ["nid", "passport", "driving-license"],
        default: "nid",
      },
      status: {
        type: String,
        enum: ["not verified", "requested", "verified", "cancelled"],
        default: "not verified",
      },
      attatchment: [],
    },
    advance: {
      presentAddress: {
        type: String,
      },
      parmanentAddress: {
        type: String,
      },
      city: {
        type: String,
      },
      state: {
        type: String,
      },
      zip: {
        type: String,
      },
      status: {
        type: String,
        enum: ["not verified", "requested", "verified", "cancelled"],
        default: "not verified",
      },
      attatchment: [],
    },
  },
  {
    timestamps: true,
  }
);

//   @ MIDDLEWARES

const Kyc = mongoose.model("Kyc", kycSchema);
export default Kyc;
