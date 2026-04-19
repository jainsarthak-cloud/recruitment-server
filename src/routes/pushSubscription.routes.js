import express from "express";
import pushSubscriptionController from "../controllers/pushSubscriptionController.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";

const router = express.Router();

router.post("/subscribe", pushSubscriptionController.subscribe);
router.post("/unsubscribe", pushSubscriptionController.unsubscribe);

export default router;
