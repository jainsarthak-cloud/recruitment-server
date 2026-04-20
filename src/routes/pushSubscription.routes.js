import express from "express";
import pushSubscriptionController from "../controllers/pushSubscriptionController.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
  "/subscribe",
  authenticateJWT,
  pushSubscriptionController.subscribe,
);
router.post(
  "/unsubscribe",
  authenticateJWT,
  pushSubscriptionController.unsubscribe,
);

export default router;
