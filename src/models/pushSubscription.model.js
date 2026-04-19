import mongoose from "mongoose";

const pushSubscriptionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: false, // allow guest users also
  },

  endpoint: {
    type: String,
    required: true,
    unique: true, // prevent duplicates
  },

  keys: {
    p256dh: {
      type: String,
      required: true,
    },
    auth: {
      type: String,
      required: true,
    },
  },

  device: {
    type: String, 
  },

  userAgent: {
    type: String, 
  },

  isActive: {
    type: Boolean,
    default: true,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

  export default mongoose.model("PushSubscription", pushSubscriptionSchema);
