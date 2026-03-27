import ProductService from "../services/product.service.js"

class ProductController{
    constructor() {
        this.productService = new ProductService()
    }

    create = async (req, res, next) => {
       try {
           const productData  = req.body
           console.log(productData);
           
           const result = await this.productService.create(productData);
           res.status(200).json({
               success: true,
               message: "Product created successfully!",
               product:result
           })
       } catch (error) {
        console.log("error in product create:",error)
        next(error)
       }
    }

    getProduct = async (req, res, next) => {
        try {
            const {id} = req.params;
            const result = await this.productService.getProduct(id)
            console.log(result);
            
            return res.status(201).json({
                success: true,
                message: "Product found",
                product:result
            })
        } catch (error) {
            console.log("error in fetching product",error)
        next(error)
        }
    }
    getAllProduct = async (req, res, next) => {
        try {
            const result = await this.productService.getAllProduct()
            return res.status(201).json({
                success: true,
                message: "products fetched",
                products:result
            })

        } catch (error) {
            console.log("error in fetching products",error);
            next(error)
        }
    }
    updateProduct = async (req, res, next) => {
        try {
            const { id } = req.params;
            const data = req.body;
            const result = await this.productService.updateProduct(id,data)
            return res.status(201).json({
                success: true,
                message: "products update",
                products:result
            })

        } catch (error) {
            console.log("error in Updating products",error);
            next(error)
        }
    }
    deleteProduct =async (req, res, next) => {
        try {
            const { id } = req.params;
            const result = await this.productService.deleteProduct(id)
            return res.status(201).json({
                success: true,
                message: "products deleted",
                products:result
            })

        } catch (error) {
            console.log("error in deleting product",error);
            next(error)
        }
    }
}
export default new ProductController