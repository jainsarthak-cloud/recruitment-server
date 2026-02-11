import IProductRepository from "../contracts/IProductRepository.js";
import Product from "../../models/product.model.js";

class MongoProductRepository extends IProductRepository {
  async create(product) {
    return Product.create(product);
  }

  async findAll() {
    return Product.find();
  }

  async findById(id) {
    return Product.findById(id);
  }

  async update(id, data) {
    return Product.findByIdAndUpdate(id, data, { new: true });
  }

  async delete(id) {
    return Product.findByIdAndDelete(id);
  }
}

export default MongoProductRepository;
