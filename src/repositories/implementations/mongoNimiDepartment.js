import mongoose from "mongoose";
import Department from "../../models/NimiDepartment.model.js";
import { AppError } from "../../utils/errors.js";
import IDepartmentRepository from "../contracts/IsDepartment.js";

class MongoDepartmentRepository extends IDepartmentRepository {

  async create(data) {
    try {
      return await Department.create(data);
    } catch (error) {
      if (error.code === 11000) {
        throw new AppError("Department already exists", 409);
      }
      throw new AppError("Unable to create department", 500);
    }
  }

  async findAll() {
    try {
      return await Department.find().sort({ createdAt: -1 });
    } catch {
      throw new AppError("Unable to fetch departments", 500);
    }
  }

 

  async updateById(id, data) {
    const updated = await Department.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
    if (!updated) throw new AppError("Department not found", 404);
    return updated;
  }

  async deleteById(id) {
    const deleted = await Department.findByIdAndDelete(id);
    if (!deleted) throw new AppError("Department not found", 404);
    return deleted;
  }
}

export default MongoDepartmentRepository;