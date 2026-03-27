import MongoProductRepository from "../repositories/implementations/mongoProductRepository.js";
import { AppError } from "../utils/errors.js";

class ProductService {
  constructor() {
    this.productRepository = new MongoProductRepository();
  }

  async create(productData) {
    //findexisted product
      const { title } = productData; 
      let existedProduct = await this.productRepository.existedProduct(title);
      console.log("existedddd",existedProduct);
      
    if (existedProduct) throw new AppError("Product all ready existed", 409);
    const newProduct = await this.productRepository.create(productData);
    return newProduct;
  }

  async getProduct(id) {
    let fetchProduct = await this.productRepository.getProduct(id);
    return fetchProduct;
  }
  async getAllProduct() {
    let result = await this.productRepository.getAllProduct();
    if (result) return result;
    return null;
  }
 
  async updateProduct(id, data) {
    let result = await this.productRepository.updateProduct(id, data);
    if (!result) throw new AppError("failed to update product", 401);
    return result;
  }
  async deleteProduct(id) {
    let result = await this.productRepository.deleteProduct(id);
    if (!result) throw new AppError("failed to delete product", 401);
    return result;
  }
}
export default ProductService;
