import express from "express";
import ProductController from "../controllers/product.controller.js";
import validateRequest from "../middlewares/validators/validateRequest.js";
import { createProductValidator, updatedProdectValidator } from "../middlewares/validators/product.validator.js";

const router = express.Router()
const productsController = new ProductController()

router.post("/create", validateRequest(createProductValidator), productsController.createProduct);
router.get("/fetch", productsController.getAllProdect)
router.get("/:id", productsController.getProductById)
router.delete("/:id", productsController.deleteProductById)
router.patch("/:id", validateRequest(updatedProdectValidator), productsController.updateProductById)



export default router;