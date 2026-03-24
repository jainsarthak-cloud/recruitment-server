import mongoProductRepository from "../repositories/implementations/mongoProductRepository.js";
import { AppError } from "../utils/errors.js";

class ProductService {
  constructor() {
    this.productRepo = new mongoProductRepository();
  }

  async createProduct(data) {
    return await this.productRepo.createProduct(data);
  }
  async getAllProducts() {
    return this.productRepo.getAllProducts();
  }

  async getProductsById(id) {
    const product = await this.productRepo.getProductById(id);
    if (!product) {
      throw new AppError("Product not found ", 404);
    }
    return product;
  }

  async updateProduct(id, data) {
    const product = await this.productRepo.updateProduct(id, data);

    if (!product) {
      throw new AppError("Product now found", 404);
    }
    return product;
  }

  async deleteProduct(id) {
    const product = await this.productRepo.deleteProduct(id);
    if (!product) {
      throw new AppError("Product not found", 404);
    }
    return product;
  }
}

export default ProductService;
