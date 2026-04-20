import webpush from "../config/webPush.js";
import MongoPushSubscriptionRepository from "../repositories/implementations/mongoPushSubscriptionRepository.js";

class PushSubscriptionService {
  constructor() {
    this.subscriptionRepository = new MongoPushSubscriptionRepository();
  }

  async sendToSubscription(subscription, payload) {
    try {
      await webpush.sendNotification(subscription, JSON.stringify(payload), {
        TTL: 86400, // 24 hours tk notification store hoga
        vapidDetails: {
          subject: process.env.VAPID_MAILTO,
          publicKey: process.env.VAPID_PUBLIC_KEY,
          privateKey: process.env.VAPID_PRIVATE_KEY,
        },
      });
      return { success: true, endpoint: subscription.endpoint };
    } catch (error) {
      if (error.statusCode === 410 || error.statusCode === 404) {
        await this.subscriptionRepository.delete(subscription.endpoint);
        console.log(`Removed stale subscription: ${subscription.endpoint}`);
      } else {
        console.error(
          `Push failed for ${subscription.endpoint}:`,
          error.message,
        );
      }
      return {
        success: false,
        endpoint: subscription.endpoint,
        error: error.message,
      };
    }
  }

  async sendNotificationHelper(subscriptions, payload) {
    if (subscriptions.length === 0) {
      console.log("No subscribers to notify.");
      return { sent: 0, failed: 0, total: 0 };
    }

    const results = await Promise.allSettled(
      subscriptions.map((sub) => this.sendToSubscription(sub, payload)),
    );

    let sent = 0;
    let failed = 0;

    results.forEach((result) => {
      if (result.status === "fulfilled" && result.value.success) sent++;
      else failed++;
    });

    return { sent, failed, total: subscriptions.length };
  }

  async sendNotification(payload, options = {}) {
    let allSubscriptions = await this.subscriptionRepository.findAll();
    console.log("sare subscriptions -> ", allSubscriptions);

    if (options.endpoints) {
      if (options.endpoints.length === 0) {
        console.log("No endpoints → skipping notification");
        return { sent: 0, failed: 0, total: 0 };
      }

      const targetSet = new Set(options.endpoints);

      const allSubscriptions = await this.subscriptionRepository.findAll();

      const filteredSubscriptions = allSubscriptions.filter((s) =>
        targetSet.has(s.endpoint),
      );

      return await this.sendNotificationHelper(filteredSubscriptions, payload);
    }

    if (options.broadcast === true) {
      const allSubscriptions = await this.subscriptionRepository.findAll();
      return await this.sendNotificationHelper(allSubscriptions, payload);
    }
  }

  async subscribe(subscription, userId) {
    return await this.subscriptionRepository.save(subscription, userId);
  }

  async unsubscribe(endpoint) {
    return await this.subscriptionRepository.delete(endpoint);
  }
}

export default PushSubscriptionService;
