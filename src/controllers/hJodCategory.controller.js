import hJobCategoryService from "../services/hJodCategory.service.js";

class HJobCategoryController {

    constructor() {
        this.jobCategoryService = new hJobCategoryService();
    }
    /**
    * Create Job Category
    */

    create = async (req, res, next) => {
        try {
            const createJob = await this.jobCategoryService.createCategory(req.body)

            return res.status(201).json({
                success: true,
                data: createJob,
                message: "Categroy cerated successfully"
            })
        } catch (error) {
            next(error)
        }
    }

    /**
    * Get Job Category  
    */

    get = async (req, res, next) => {
        try {
            const page = parseInt(req.query.page || 1)
            const limit = parseInt(req.query.limit || 10)
            const getAllCategory = await this.jobCategoryService.getAllCategory(page, limit)

            return res.status(200)
                .json({
                    success: true,
                    data: getAllCategory,
                    message: "Categories fetched successfully"
                })
        } catch (error) {
            next(error)
        }
    }

    /**
   * Get Job Category by ID
   */

    getById = async (req, res, next) => {
        try {
            const { id } = req.params
            const getById = await this.jobCategoryService.getById(id)

            return res.status(200)
                .json({
                    success: true,
                    data: getById,
                    message: "Categories fetched successfully"
                })
        } catch (error) {
            next(error)
        }
    }

    /**
        * Update Job Category 
    */

    update = async (req, res, next) => {
        try {
            const { id } = req.params
            const data = req.body
            const update = await this.jobCategoryService.updateCategory(id, data)

            return res.status(200)
                .json({
                    success: true,
                    data: update,
                    message: "Category updated successfully"
                })
        } catch (error) {
            next(error)
        }
    }

    /**
          * Delete Job Category 
      */

    delete = async (req, res, next) => {
        try {
            const { id } = req.params
            await this.jobCategoryService.deleteById(id)

            res.status(204)
                .json({
                    success: true,
                    data: null,
                    message: "Category deleted successfully"
                })
        } catch (error) {
            next(error)
        }
    }

}

export default new HJobCategoryController()