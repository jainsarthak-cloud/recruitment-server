import ProductService from "../services/product.service.js";

class ProductController {
  constructor() {
    this.productService = new ProductService();
  }

  createProduct = async (req, res, next) => {
    try {
      const productData = { ...req.body };
      const result = await this.productService.createProduct(productData);

      res.status(201).json({
        success: true,
        message: "Product created successfully",
        data: result,
      });
    } catch (error) {
      next(error);
    }
  };

  getAllProdect = async (req, res) => {
    try {
      const result = await this.productService.getAllProduct();

      res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        data: result,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  };

  getProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.productService.getProductById(id);

      res.status(200).json({
        success: true,
        data: result,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  };

  deleteProductById = async (req, res) => {
    try {
      const { id } = req.params;
      const result = await this.productService.deleteProductById(id);

      res.status(200).json({
        success: true,
        message: "Product deleted successfully",
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  };

  updateProductById = async (req, res) => {
    try {
      const id = req.params.id;
      const data = req.body;

      const result = await this.productService.updateProductById(id, data);

      res.status(200).json({
        success: true,
        message: "Product updated successfully",
        data: result,
      });
    } catch (error) {
      res.status(404).json({
        success: false,
        error: error.message,
      });
    }
  };
}

export default ProductController;
