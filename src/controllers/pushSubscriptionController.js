import PushSubscriptionService from "../services/pushSubscription.service.js";

class PushSubscriptionController {
  constructor() {
    this.subscriptionService = new PushSubscriptionService();

    this.subscribe = this.subscribe.bind(this);
    this.unsubscribe = this.unsubscribe.bind(this);
  }

  async subscribe(req, res, next) {
    console.log("req subscribe me aa rhi hai");

    try {
      const subscription = req.body;

      if (!subscription || !subscription.endpoint) {
        return res.status(400).json({ error: "Invalid subscription object" });
      }

      await this.subscriptionService.subscribe(subscription);

      res.status(201).json({ message: "Subscribed successfully" });
    } catch (error) {
      console.error("Subscribe error:", error);
      next(error);
    }
  }

  async unsubscribe(req, res, next) {
    console.log("req un-subscribe me aa rhi hai");

    try {
      const { endpoint } = req.body;

      if (!endpoint) {
        return res.status(400).json({ error: "Endpoint is required" });
      }

      await this.subscriptionService.unsubscribe(endpoint);

      res.status(200).json({ message: "Unsubscribed successfully" });
    } catch (error) {
      console.error("Unsubscribe error:", error);
      next(error);
    }
  }
}

export default new PushSubscriptionController();
