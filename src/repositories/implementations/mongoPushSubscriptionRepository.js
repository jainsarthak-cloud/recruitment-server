import pushSubscriptionModel from "../../models/pushSubscription.model.js";
import { AppError } from "../../utils/errors.js";
import IPushSubscriptionRepository from "../contracts/IPushSubscriptionRepository.js";

class MongoPushSubscriptionRepository extends IPushSubscriptionRepository {
  async save(subscription, userId) {
    try {
      const existing = await pushSubscriptionModel.findOne({
        endpoint: subscription.endpoint,
      });

      if (existing) {
        existing.keys = subscription.keys;
        existing.userId = userId; 
        return await existing.save();
      }

      const newSub = new pushSubscriptionModel({
        ...subscription,
        userId,
      });

      return await newSub.save();
    } catch (error) {
      throw new AppError("Failed to save subscription", 500);
    }
  }

  async delete(endpoint) {
    try {
      await pushSubscriptionModel.findOneAndDelete({ endpoint });
    } catch (error) {
      throw new AppError("Failed to delete subscription", 500);
    }
  }

  async findAll() {
    try {
      return await pushSubscriptionModel.find().lean();
    } catch (error) {
      throw new AppError("Failed to fetch subscriptions", 500);
    }
  }

  async findByEndpoint(endpoint) {
    try {
      return await pushSubscriptionModel.findOne({ endpoint }).lean();
    } catch (error) {
      throw new AppError("Failed to find subscription", 500);
    }
  }

  async findByUserId(userId) {
    try {
      return await pushSubscriptionModel.find({ userId }).lean();
    } catch (error) {
      throw new AppError("Failed to fetch subscriptions by userId", 500);
    }
  }

  async findByUserIds(userIds) {
    try {
      return await pushSubscriptionModel
        .find({
          userId: { $in: userIds },
        })
        .lean();
    } catch (error) {
      throw new AppError("Failed to fetch subscriptions by userIds", 500);
    }
  }
}

export default MongoPushSubscriptionRepository;
