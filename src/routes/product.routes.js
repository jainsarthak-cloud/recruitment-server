import express from "express";
import productController from "../controllers/product.controller.js";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import { validateProduct } from "../middlewares/validators/product.validator.js";

const router = express.Router();

router.post("/create", authenticateJWT,validateProduct, productController.create);
router.get("/",  productController.getAll);
router.get("/:id", productController.getById);
router.put("/update/:id",authenticateJWT, validateProduct, productController.update);
router.delete("/delete/:id", authenticateJWT, productController.remove);

export default router;
