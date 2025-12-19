import { Product } from "../../models/product.model.js";
import { AppError } from "../../utils/errors.js";
import IProductRepository from "../contracts/IProductRepository.js";

class MongoProductRepository extends IProductRepository {
  async createProduct(data) {
    try {
      const addProduct = await Product.create(data);
      return addProduct;
    } catch (error) {
      throw new AppError("Error creating product: " + error.message, 500);
    }
  }

  async getAllProduct() {
    try {
      const products = await Product.find().select("-__v").sort({ name: 1 });
      return products;
    } catch (error) {
      throw new AppError("Error getting all products: " + error.message, 500);
    }
  }

  async getProductById(id) {
    try {
      const product = await Product.findById(id).select("-__v");
      return product;
    } catch (error) {
      throw new AppError("Error getting ById product: " + error.message, 500);
    }
  }

  async deleteProductById(id) {
    try {
      const deleted = await Product.findByIdAndDelete(id);
      return deleted;
    } catch (error) {
      throw new AppError("Error getting delete product: " + error.message, 500);
    }
  }

  async updateProductById(id, data) {
    try {
      const updated = await Product.findByIdAndUpdate(id, {$set: data}, { new: true }).select("-__v");
      return updated;
    } catch (error) {
      throw new AppError("Error getting all product: " + error.message, 500);
    }
  }
}


export default MongoProductRepository;

//Implementation mein hota hai:
//Model ka use
//Database queries
//Data mapping
//Error handling (DB level)
