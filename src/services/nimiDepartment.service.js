import MongoDepartmentRepository from "../repositories/implementations/mongoNimiDepartment.js";
import { AppError } from "../utils/errors.js";

class DepartmentService {
  constructor(repo) {
    this.MongoDepartmentRepository = repo;
  }

  async createDepartment(data) {
    return await this.MongoDepartmentRepository.create(data);
  }

  async getDepartments() {
    return await this.MongoDepartmentRepository.findAll();
  }


  async updateDepartment(id, data) {
    return await this.MongoDepartmentRepository.updateById(id, data);
  }

  async deleteDepartment(id) {
  return await this.MongoDepartmentRepository.deleteById(id);
}
}

const departmentService = new DepartmentService(
  new MongoDepartmentRepository()
);

export default departmentService;