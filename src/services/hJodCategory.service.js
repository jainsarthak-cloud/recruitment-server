import { AppError } from '../utils/errors.js'
import HMongoJobCategoryRepository from '../repositories/implementations/hMongoJobCategoryRepository.js'

class HJobCategoryService {

    constructor() {
        this.jobCategoryRepository = new HMongoJobCategoryRepository()
    }

    async createCategory(data) {
        const isExistName = await this.jobCategoryRepository.findByName(data.name)
        if (isExistName) {
            throw new AppError("Category name already exists", 400);
        }

        return await this.jobCategoryRepository.create(data)
    }

    async getAllCategory(page = 1, limit = 10) {
        return await this.jobCategoryRepository.findAll(page, limit)
    }

    async getById(id) {
        const category = await this.jobCategoryRepository.findById(id)
        if (!category) throw new AppError("Category not found", 404)
        return category
    }

    async updateCategory(id, data) {
        if (data.name) {
            const exist = await this.jobCategoryRepository.findByName(data.name)
            if (exist && exist._id.toString() !== id) {
                throw new AppError("Category name already exists", 400)
            }
        }

        // ✅ PASS OBJECT
        const updated = await this.jobCategoryRepository.updateById(id, data)
        if (!updated) throw new AppError("Category not found", 404)

        return updated
    }

    async deleteById(id) {
        const deleted = await this.jobCategoryRepository.deleteById(id)
        if (!deleted) throw new AppError("Category not found", 404)
        return deleted
    }
}

export default HJobCategoryService
