import MongoEmployeeRepository from "../repositories/implementations/mongoEmplyeeRepository.js";
import Employee from "../models/employee.model.js";
import { AppError } from "../utils/errors.js";
import { v7 as uuid } from "uuid";

class EmployeeService {
  constructor() {
    this.EmployeeRepository = new MongoEmployeeRepository();
  }
  async createEmployee(data) {
    if (data.employeeid) {
      throw new AppError("Employee already exist", 400);
    }
    const uniqueId = uuid();
    const employeeName = data.employeeName?.trim().split(" ")[0];
    const employeeId = `${employeeName}-${uniqueId}`;

    return await this.EmployeeRepository.createEmployee({
      ...data,
      employeeId: employeeId,
    });
  }

  async getEmployee(employeeId) {
    if (!employeeId) {
      throw new AppError("EmployeeId is required", 400);
    }

    const employee = await this.EmployeeRepository.getEmployee(employeeId);
    if (!employee) {
      throw new AppError("Employee not found", 404);
    }
    return employee;
  }

  async updateEmployee(employeeId, data) {
    if (!employeeId) {
      throw new AppError("EmployeeId is required", 400);
    }

    const employee = await this.EmployeeRepository.getEmployee(employeeId);
    if (!employee) {
      throw new AppError("Employee not found", 404);
    }
    return await this.EmployeeRepository.updateEmployee(employeeId, data);
  }

  async deleteEmployee(employeeId) {
    if (!employeeId) {
      throw new AppError("EmployeeId is required", 400);
    }
    const employee = await this.EmployeeRepository.getEmployee(employeeId);
    if (!employee) {
      throw new AppError("Employee not found", 404);
    }
    await this.EmployeeRepository.deleteEmployee(employeeId);
  }
}

export default EmployeeService;
