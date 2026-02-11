import mongoose from "mongoose";

const { Schema } = mongoose;

const AReviewSchema = new Schema(
  {
    productId: {
      type: Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },

    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },

    comment: {
      type: String,
      trim: true,
    },

    isActive: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    collection: "reviews",
  }
);

// Indexes
AReviewSchema.index({ productId: 1 });
AReviewSchema.index({ userId: 1 });
AReviewSchema.index({ rating: -1 });

export const AReview = mongoose.model("AReview", AReviewSchema);
