import productService from "../services/product.service.js";

class ProductController {
  async create(req, res, next) {
    try {
      const product = await productService.createProduct(req.body);
      res.status(201).json(product);
    } catch (err) {
      next(err);
    }
  }

  async getAll(req, res, next) {
    try {
      const products = await productService.getProducts();
      res.json(products);
    } catch (err) {
      next(err);
    }
  }

  async getById(req, res, next) {
    try {
      const product = await productService.getProductById(req.params.id);
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  async update(req, res, next) {
    try {
      const product = await productService.updateProduct(
        req.params.id,
        req.body
      );
      res.json(product);
    } catch (err) {
      next(err);
    }
  }

  async remove(req, res, next) {
    try {
      await productService.deleteProduct(req.params.id);
      res.json({ message: "Product deleted" });
    } catch (err) {
      next(err);
    }
  }
}

export default new ProductController();
