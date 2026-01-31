import express from "express";
import {
  addToCart,
  getCart,
  getCartById,
  updateCartItem,
  deleteCartItem,
} from "../controllers/cart.Controllers.js";

const router = express.Router();

router.post("/", addToCart);
router.get("/", getCart);
router.get("/:id", getCartById);
router.put("/:id", updateCartItem);
router.delete("/:id", deleteCartItem);

export default router;
