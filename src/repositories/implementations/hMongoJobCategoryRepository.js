import HJobCategoryRepository from '../contracts/HJobCategoryRepository.js'
import hJobCategory from '../../models/hJobCategory.model.js'
import { paginateAggregation } from '../../utils/pagination.util.js'

class HMongoJobCategoryRepository extends HJobCategoryRepository {

    async create(categoryData) {
        try {
            return await hJobCategory.create(categoryData);
        } catch (error) {
            if (error.code === 11000) {
                throw { status: 400, message: "Category name already exists" }
            }
            throw error
        }
    }

    async findByName(name) {
        return await hJobCategory.findOne({ name })
    }

    async findById(id) {
        return await hJobCategory.findById(id)
    }

    async findAll(page = 1, limit = 10) {
        const pipline = [
            { $sort: { name: 1 } }
        ]
        return await paginateAggregation(hJobCategory, pipline, { page, limit });
    }

    async updateById(id, updateData) {
        try {
            const updated = await hJobCategory.findByIdAndUpdate(id, updateData, {
                new: true,
                runValidators: true
            })
            return updated
        } catch (error) {
            if (error.code === 11000) {
                throw { status: 400, message: "Category name already exists" };
            }
            throw error
        }
    }

    async deleteById(id) {
        return await hJobCategory.findByIdAndDelete(id)
    }

}

export default HMongoJobCategoryRepository