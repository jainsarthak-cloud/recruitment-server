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

  async sendNotification(payload, options = {}) {
    let allSubscriptions = await this.subscriptionRepository.findAll();

    if (options.endpoints && options.endpoints.length > 0) {
      const targetSet = new Set(options.endpoints);
      allSubscriptions = allSubscriptions.filter((s) =>
        targetSet.has(s.endpoint),
      );
    }

    if (allSubscriptions.length === 0) {
      console.log("No subscribers to notify.");
      return { sent: 0, failed: 0, total: 0 };
    }

    const results = await Promise.allSettled(
      allSubscriptions.map((sub) => this.sendToSubscription(sub, payload)),
    );

    let sent = 0;
    let failed = 0;

    results.forEach((result) => {
      if (result.status === "fulfilled" && result.value.success) {
        sent++;
      } else {
        failed++;
      }
    });

    console.log(
      `Push batch complete — sent: ${sent}, failed: ${failed}, total: ${allSubscriptions.length}`,
    );

    return { sent, failed, total: allSubscriptions.length };
  }

  async subscribe(subscription) {
    return await this.subscriptionRepository.save(subscription);
  }

  async unsubscribe(endpoint) {
    return await this.subscriptionRepository.delete(endpoint);
  }
}

export default PushSubscriptionService;
