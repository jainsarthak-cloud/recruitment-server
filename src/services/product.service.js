import Product from "../models/product.model.js";
import { AppError } from "../utils/errors.js";

class ProductService {
  async createProduct(data) {
    const product = await Product.create(data);
    return product;
  }

  async getAllProducts() {
    return Product.find();
  }

  async getProductById(id) {
    const product = await Product.findById(id);
    if (!product) throw new AppError("Product not found", 404);
    return product;
  }

  async updateProduct(id, data) {
    const product = await Product.findByIdAndUpdate(id, data, { new: true });
    if (!product) throw new AppError("Product not found", 404);
    return product;
  }

  async deleteProduct(id) {
    const product = await Product.findByIdAndDelete(id);
    if (!product) throw new AppError("Product not found", 404);
    return product;
  }
}

export default ProductService;
