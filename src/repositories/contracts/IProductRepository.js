class IProductRepository {
  catch(error) {
    console.error("CREATE PRODUCT ERROR:", error);
    throw new AppError(error.message || "Failed to create product", 500);
  }

  async getAllProducts() {
    throw new Error("Method not implemented");
  }

  async getProductById(id) {
    throw new Error("Method not implemented");
  }

  async updateProduct(id, data) {
    throw new Error("Method not implemented");
  }

  async deleteProduct(id) {
    throw new Error("Method not implemented");
  }
}

export default IProductRepository;
