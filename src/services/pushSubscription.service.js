import webpush from "../config/webPush.js";
import MongoPushSubscriptionRepository from "../repositories/implementations/mongoPushSubscriptionRepository.js";

class PushSubscriptionService {
  constructor() {
    this.subscriptionRepository = new MongoPushSubscriptionRepository();
  }

  /**
   * Send a push notification to one specific subscription.
   * Used internally — callers use sendNotification() or sendToAll() instead.
   *
   * @param {Object} subscription  - PushSubscription object from the browser
   * @param {Object} payload       - { title, body, icon, data, url }
   * @returns {Promise<{success: boolean, endpoint: string, error?: string}>}
   */
  async sendToSubscription(subscription, payload) {
    try {
      await webpush.sendNotification(
        subscription,
        JSON.stringify(payload), // payload must be a string
        {
          TTL: 86400,
          vapidDetails: {
            subject: process.env.VAPID_MAILTO,
            publicKey: process.env.VAPID_PUBLIC_KEY,
            privateKey: process.env.VAPID_PRIVATE_KEY,
          },
        },
      );
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

  /**
   * PRIMARY CALLABLE — send a notification to ALL stored subscribers.
   * Uses Promise.allSettled so every subscriber is attempted even if one fails.
   *
   * @param {Object} payload - { title, body, icon?, url?, data? }
   * @param {Object} [options]
   * @param {string[]} [options.endpoints]
   * @returns {Promise<{sent: number, failed: number, total: number}>}
   */
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

// // backend/src/services/notificationService.js
// // The main service. Import sendNotification() wherever you need to trigger
// // a push (e.g. in a controller after an order is placed, a comment is posted, etc.)

// import webpush from "../config/webPush.js";
// import subscriptionRepository from "../repositories/implementations/subscriptionRepository.js";

// /**
//  * Send a push notification to one specific subscription.
//  * Used internally — callers use sendNotification() or sendToAll() instead.
//  *
//  * @param {Object} subscription  - PushSubscription object from the browser
//  * @param {Object} payload       - { title, body, icon, data, url }
//  * @returns {Promise<{success: boolean, endpoint: string, error?: string}>}
//  */
// async function sendToSubscription(subscription, payload) {
//   try {
//     await webpush.sendNotification(
//       subscription,
//       JSON.stringify(payload), // payload must be a string
//       {
//         TTL: 86400,
//         vapidDetails: {
//           subject: process.env.VAPID_MAILTO,
//           publicKey: process.env.VAPID_PUBLIC_KEY,
//           privateKey: process.env.VAPID_PRIVATE_KEY,
//         },
//       },
//     );
//     return { success: true, endpoint: subscription.endpoint };
//   } catch (error) {
//     // HTTP 410 Gone = subscription is no longer valid (user revoked permission)
//     // HTTP 404 Not Found = endpoint no longer exists
//     // In both cases we should delete the stale subscription from our store.
//     if (error.statusCode === 410 || error.statusCode === 404) {
//       await subscriptionRepository.delete(subscription.endpoint);
//       console.log(`Removed stale subscription: ${subscription.endpoint}`);
//     } else {
//       // Log other errors (network issues, malformed payload, etc.) but don't crash
//       console.error(`Push failed for ${subscription.endpoint}:`, error.message);
//     }
//     return {
//       success: false,
//       endpoint: subscription.endpoint,
//       error: error.message,
//     };
//   }
// }

// /**
//  * PRIMARY CALLABLE — send a notification to ALL stored subscribers.
//  * Uses Promise.allSettled so every subscriber is attempted even if one fails.
//  *
//  * @param {Object} payload - { title, body, icon?, url?, data? }
//  * @param {Object} [options]
//  * @param {string[]} [options.endpoints] - If provided, only send to these endpoints.
//  *                                         Omit to send to all subscribers.
//  * @returns {Promise<{sent: number, failed: number, total: number}>}
//  *
//  * Usage examples:
//  *   // Send to everyone
//  *   await sendNotification({ title: 'New order!', body: 'Order #123 placed', url: '/orders/123' });
//  *
//  *   // Send to specific subscribers (e.g. a single user's devices)
//  *   await sendNotification({ title: 'Reply', body: 'Someone replied to you' }, { endpoints: user.pushEndpoints });
//  */
// async function sendNotification(payload, options = {}) {
//   // Fetch all subscriptions from the repository
//   let allSubscriptions = await subscriptionRepository.findAll();

//   // If caller specified target endpoints, filter down to just those
//   if (options.endpoints && options.endpoints.length > 0) {
//     const targetSet = new Set(options.endpoints);
//     allSubscriptions = allSubscriptions.filter((s) =>
//       targetSet.has(s.endpoint),
//     );
//   }

//   if (allSubscriptions.length === 0) {
//     console.log("No subscribers to notify.");
//     return { sent: 0, failed: 0, total: 0 };
//   }

//   // Fire to all targets concurrently; allSettled never rejects even if some fail
//   const results = await Promise.allSettled(
//     allSubscriptions.map((sub) => sendToSubscription(sub, payload)),
//   );

//   // Tally results for logging / return value
//   let sent = 0;
//   let failed = 0;
//   results.forEach((result) => {
//     if (result.status === "fulfilled" && result.value.success) {
//       sent++;
//     } else {
//       failed++;
//     }
//   });

//   console.log(
//     `Push batch complete — sent: ${sent}, failed: ${failed}, total: ${allSubscriptions.length}`,
//   );
//   return { sent, failed, total: allSubscriptions.length };
// }

// export default sendNotification;
