import ProductService from "../services/product.service.js";

const productService = new ProductService();
export const createProduct = async (req, res) => {
  const product = await productService.createProduct(req.body);
  res.status(201).json(product);
};
export const getAllProducts = async (req, res) => {
  const products = await productService.getAllProducts();
  res.json(products);
};
export const getProductById = async (req, res) => {
  const product = await productService.getProductsById(req.params.id);
  res.json(product);
};

export const updateProduct = async (req,res) => {
  const product = await productService.updateProduct(req.params.id, req.body);
  res.json(product);
};
export const deleteProduct = async (req,res) => {
  const product = await productService.deleteProduct(req.params.id);
  res.json({ message: "Product deleted successfully" });
};
