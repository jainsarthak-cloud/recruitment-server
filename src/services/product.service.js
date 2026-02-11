import MongoProductRepository from "../repositories/implementations/mongoProductRepository.js";

class ProductService {
  constructor() {
    this.repo = new MongoProductRepository();
  }

  async createProduct(data) {
    return this.repo.create(data);
  }

  async getProducts() {
    return this.repo.findAll();
  }

  async getProductById(id) {
    const product = await this.repo.findById(id);
    if (!product) throw new Error("Product not found");
    return product;
  }

  async updateProduct(id, data) {
    const product = await this.repo.update(id, data);
    if (!product) throw new Error("Product not found");
    return product;
  }

  async deleteProduct(id) {
    const product = await this.repo.delete(id);
    if (!product) throw new Error("Product not found");
    return product;
  }
}

export default new ProductService();
