import Product from "../../models/product.model.js";
import { AppError } from "../../utils/errors.js";
import IProductRepository from "../contracts/IProductRepository.js";

class mongoProductRepository extends IProductRepository {
  async createProduct(data) {
    try {
      const product = new Product(data);
      return await product.save();
    } catch (error) {
      console.log(error)
      throw new AppError("failed to create product", 500);
    }
  }

  async getAllProducts() {
    return await Product.find();
  }

  async getProductById(id) {
    return await Product.findById(id);
  }
  async updateProduct(id, data) {
    return await Product.findByIdAndUpdate(id, data, { new: true });
  }
  async deleteProduct(id) {
    return await Product.findByIdAndDelete(id);
  }
}
export default mongoProductRepository;
