import { Product } from "../../models/product.model.js";
import { AppError } from "../../utils/errors.js";
import IProductRepositry from "../contracts/IProductRepository.js";

class mongoProductRepository extends IProductRepositry {
  async create(productData) {
    try {
      const newProduct = new Product(productData);
      const savedProduct = await newProduct.save();
      return savedProduct;
    } catch (error) {
      throw new AppError("Failed to create Product ", 500, error);
    }
  }

  async existedProduct(title) {
  try {
    const existProduct = await Product.findOne({title});
    return existProduct;

  } catch (error) {
    return null
  }
}

  async getProduct(id) {
  try {
    const existProduct = await Product.findById(id);

    if (!existProduct) {
      throw new AppError("Product not found", 404);
    }

    return existProduct;

  } catch (error) {
    throw new AppError("Failed to find product", 500);
  }
}
  async getAllProduct() {
    try {
      let res = await Product.find();
      if (res) return res;
    } catch (error) {
      throw new AppError("Failed to fetch Products", 500, error);
    }
  }

  
  async updateProduct(id, data) {
    try {
      const updatedProduct = await Product.findByIdAndUpdate(id,
        { $set: data },
        {
          new: true,
         runValidators:true
       }
      )
      return updatedProduct
    } catch (error) {
      throw new AppError("Failed to update Product", 500, error);
    }
  }

  async deleteProduct(id) {
    try {
      const deletedProduct = await Product.findByIdAndDelete(id)
      if (deletedProduct) return deletedProduct
      
      throw new AppError("Product not found", 404);
    
    } catch (error) {
       throw new AppError("Failed to delete Product", 500, error);
    }
  }
}
export default mongoProductRepository;
