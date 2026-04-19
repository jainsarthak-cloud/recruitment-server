// // backend/src/repositories/subscriptionRepository.js
// // Stores and retrieves PushSubscription objects.
// // The subscription object shape comes directly from the browser's
// // PushManager.subscribe() call and looks like:
// // { endpoint: string, keys: { p256dh: string, auth: string } }

// // In-memory store — replace with your actual DB calls
// const subscriptions = new Map(); // key: endpoint URL, value: full subscription object

// console.log("ye hain sare saved subs: ", subscriptions);
// const subscriptionRepository = {
//   // Save or update a subscription (upsert by endpoint)
//   async save(subscription) {
//     console.log("req save service tak bhi aa rhi hai");
//     console.log("After save:", Array.from(subscriptions.entries()));
//     console.log("After save:", subscriptions);

//     subscriptions.set(subscription.endpoint, subscription);
//     return subscription;
//   },

//   // Remove a subscription by its endpoint
//   async delete(endpoint) {
//     console.log("req delete service tak bhi aa rhi hai");
//    console.log("After delete:", subscriptions);

//     subscriptions.delete(endpoint);
//   },

//   // Return all stored subscriptions as an array
//   async findAll() {
//     return Array.from(subscriptions.values());
//   },

//   // Optional: find a single subscription by endpoint
//   async findByEndpoint(endpoint) {
//     return subscriptions.get(endpoint) || null;
//   },
// };

// export default subscriptionRepository;

// import Subscription from "../../models/subscription.model.js";
import pushSubscriptionModel from "../../models/pushSubscription.model.js";
import { AppError } from "../../utils/errors.js";
import IPushSubscriptionRepository from "../contracts/IPushSubscriptionRepository.js";

class MongoPushSubscriptionRepository extends IPushSubscriptionRepository {
  // Save or update a subscription (upsert by endpoint)
  async save(subscription) {
    try {
      const existing = await pushSubscriptionModel.findOne({
        endpoint: subscription.endpoint,
      });

      if (existing) {
        existing.keys = subscription.keys;
        return await existing.save();
      }

      const newSub = new pushSubscriptionModel(subscription);
      return await newSub.save();
    } catch (error) {
      throw new AppError("Failed to save subscription", 500);
    }
  }

  // Remove a subscription by its endpoint
  async delete(endpoint) {
    try {
      await pushSubscriptionModel.findOneAndDelete({ endpoint });
    } catch (error) {
      throw new AppError("Failed to delete subscription", 500);
    }
  }

  // Return all stored subscriptions as an array
  async findAll() {
    try {
      return await pushSubscriptionModel.find().lean();
    } catch (error) {
      throw new AppError("Failed to fetch subscriptions", 500);
    }
  }

  // Optional: find a single subscription by endpoint
  async findByEndpoint(endpoint) {
    try {
      return await pushSubscriptionModel.findOne({ endpoint }).lean();
    } catch (error) {
      throw new AppError("Failed to find subscription", 500);
    }
  }
}

export default MongoPushSubscriptionRepository;
