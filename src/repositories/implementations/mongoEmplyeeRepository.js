import IEmployeeRepository from "../contracts/IEmployeeRepository.js";
import Employee from "../../models/employee.model.js";
import { AppError } from "../../utils/errors.js";

class MongoEmployeeRepository extends IEmployeeRepository {
  async createEmployee(employeeData) {
    try {
      const employee = await Employee.create(employeeData);
      return employee;
    } catch (error) {
      throw new AppError("Error while creating employee" + error.message, 500);
    }
  }

  async getEmployee(employeeId) {
    try {
      const employee = await Employee.findOne(employeeId);
      return employee;
    } catch (error) {
      throw new AppError("Error while fetching employee" + error.message, 500);
    }
  }

  async updateEmployee(employeeId, employeeData) {
    try {
      const employee = await Employee.findOneAndUpdate(
        employeeId ,
        employeeData,
        { new: true, runValidators: true },
      );
      return employee;
    } catch (error) {
      throw new AppError("Error while updating employee" + error.message, 500);
    }
  }

  async deleteEmployee(employeeId) {
    try {
      await Employee.findOneAndDelete(employeeId);
    } catch (error) {
      throw new AppError("Error while deleting employee" + error.message, 500);
    }
  }
}

export default MongoEmployeeRepository;
