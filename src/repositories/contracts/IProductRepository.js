export class IProductRepository {
  async createProduct(productData) {
    throw new Error("Method 'createProduct' must be implemented");
  }

  async getAllProduct() {
    throw new Error("Method 'getAllProduct' must be Implemented");
  }

  async getProductById(id){
    throw new Error("Method 'getProductById' must be Implemented")
  }

  async deleteProductById(id){
    throw new Error("Method 'deleteProductById' must be Implemented")
  }

  async updateProductById(id, data){
    throw new Error("Method 'updateProductById' must be Implemented")
  }

  
}

export default IProductRepository;
