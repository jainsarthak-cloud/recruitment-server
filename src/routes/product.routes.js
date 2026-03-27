import express from "express"; 
import authenticateJWT from "../middlewares/auth.middleware.js";
import ProductController from "../controllers/product.controller.js";
import productController from "../controllers/product.controller.js";
import { uploadPDF } from "../middlewares/multer.middleware.js";
const router = express.Router();


router.post("/create", authenticateJWT, ProductController.create);
router.get("/:id",ProductController.getProduct)
router.get("/", productController.getAllProduct);
router.patch("/update/:id",authenticateJWT,productController.updateProduct);
router.delete("/delete/:id", authenticateJWT,productController.deleteProduct);
export default router;