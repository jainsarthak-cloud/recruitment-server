import MongoProductRepository from "../repositories/implementations/mongoProductReposirory.js";
import { AppError } from "../utils/errors.js";

class ProductService {
  constructor() {
    this.productRepository = new MongoProductRepository();
  }

  async createProduct(data) {
    if (!data.name) {
      throw new AppError("name is required ", 400);
    }
    if (!data.description) {
      throw new AppError("description is required ", 400);
    }
    if (!data.price) {
      data.endDate = null;
    }
    return await this.productRepository.createProduct(data);
  }

  async getAllProduct() {
    const products = await this.productRepository.getAllProduct();

    if (!products || products.length == 0) {
      throw new AppError("Product not found", 404);
    }

    return products;
  }

  async getProductById(id) {
    if (!id) {
      throw new AppError("product id is required", 400);
    }

    const product = await this.productRepository.getProductById(id);

    if (!product) {
      throw new AppError("Product not found", 404);
    }

    return product;
  }

  async deleteProductById(id){
    if (!id) {
      throw new AppError("product id is required", 400);
    }

    const deleted = await this.productRepository.deleteProductById(id);

    if (!deleted) {
      throw new AppError("Product not found", 404);
    }

    return deleted;
  }

  async updateProductById(id, data){
    if (!id) {
      throw new AppError("product id is required", 400);
    }

    const updated = await this.productRepository.updateProductById(id, data);

    if (!updated) {
      throw new AppError("Product not found", 404);
    }

    return updated;
  }
}

export default ProductService;

//Controller = bolta hai
//Service = sochti hai
//Repository = laata hai
