import ProductService from "../services/product.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  createProduct = asyncHandler(async (req, res) => {
    const product = await this.productService.createProduct(req.body);

    res.status(201).json({
      success: true,
      data: product,
      message: "Product created successfully",
    });
  });

  getProducts = asyncHandler(async (req, res) => {
    const products = await this.productService.getAllProducts(req.query);

    res.status(200).json({
      success: true,
      data: products,
    });
  });

  getProductById = asyncHandler(async (req, res) => {
    const product = await this.productService.getProductById(req.params.id);

    res.status(200).json({
      success: true,
      data: product,
    });
  });

  updateProduct = asyncHandler(async (req, res) => {
    const updated = await this.productService.updateProduct(
      req.params.id,
      req.body
    );

    res.status(200).json({
      success: true,
      data: updated,
      message: "Product updated successfully",
    });
  });

  deleteProduct = asyncHandler(async (req, res) => {
    await this.productService.deleteProduct(req.params.id);

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
    });
  });
}

export default ProductController;