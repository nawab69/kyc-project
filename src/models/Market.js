import mongoose from "mongoose";
const schema = mongoose.schema(
  {
    name: {
      type: String,
    },
    slug: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Market = mongoose.model("Market", schema);

export { Market };
