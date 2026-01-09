import { Router } from "express";
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";

import {
  createProductValidator,
  updateProductValidator,
} from "../middlewares/validators/product.validator.js";

import { authenticateJWT } from "../middlewares/auth.middleware.js";

const router = Router();


router.get("/", getAllProducts);


router.post("/", authenticateJWT, createProductValidator, createProduct);


router.get("/:id", getProductById);


router.put("/:id", authenticateJWT, updateProductValidator, updateProduct);


router.delete("/:id", authenticateJWT, deleteProduct);

export default router;
