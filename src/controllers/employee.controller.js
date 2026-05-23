import EmployeeService from "../services/employee.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { AppError } from "../utils/errors.js";
class EmployeeController {
  constructor() {
    this.employeeService = new EmployeeService();
  }

  // Create employee
  createEmployee = asyncHandler(async (req, res) => {
    const employeeData = {
      ...req.body,
    };
    if (!employeeData) {
      throw new AppError("Employee data no found", 400);
    }
    const result = await this.employeeService.createEmployee(employeeData);
    res.status(201).json({
      message: "Emplyee created successfully",
      result,
    });
  });

  //  get emplyee by id
  getEmployee = asyncHandler(async (req, res) => {
    const employeeId = req.params;

    if (!employeeId) {
      throw new AppError("EmployeeId required", 400);
    }
    const result = await this.employeeService.getEmployee(employeeId);
    if (!result) {
      throw new AppError("Employee not found ", 400);
    }
    res.status(201).json({
      message: "Employee fetched successfully",
      result,
    });
  });
  updateEmployee = asyncHandler(async (req, res) => {
    const employeeId = req.params;
    const updateData = req.body;
    if (!employeeId) {
      throw new AppError("EmployeeId required", 400);
    }
    const result = await this.employeeService.updateEmployee(
      employeeId,
      updateData,
    );
    if (!result) {
      throw new AppError("Employee not found ", 400);
    }
    res.status(200).json({
      message: "Employee updated successfully",
      result,
    });
  });

  deleteEmployee = asyncHandler(async (req, res) => {
    const employeeId = req.params;
    if (!employeeId) {
      throw new AppError("EmployeeId required", 400); 
    }
    await this.employeeService.deleteEmployee(employeeId);
    res.status(200).json({
      message: "Employee deleted successfully",
    });
  });
}

export default EmployeeController;
