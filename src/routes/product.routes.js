import express from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import { asyncHandler } from "../utils/asyncHandler.js";

const router = express.Router();

router.post("/", asyncHandler(createProduct));
router.get("/", asyncHandler(getAllProducts));
router.get("/:id", asyncHandler(getProductById));
router.put("/:id", asyncHandler(updateProduct));
router.delete("/:id", asyncHandler(deleteProduct));

export default router;
