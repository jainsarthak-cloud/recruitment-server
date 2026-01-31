import mongoose from "mongoose";

const cartSchema = new mongoose.Schema(
  {
    product: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      default: 0
    }
  },
  { timestamps: true }
);

export default mongoose.model("Cart", cartSchema);
