import departmentService from "../services/nimiDepartment.service.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import mongoose from "mongoose";

class DepartmentController {

  createDepartment = asyncHandler(async (req, res) => {
    const department = await departmentService.createDepartment(req.body);

    res.status(201).json({
      success: true,
      message: "Department created successfully",
      data: department,
    });
  });

  getDepartments = asyncHandler(async (req, res) => {
    const departments = await departmentService.getDepartments();

    res.status(200).json({
      success: true,
      data: departments,
    });
  });

  

  updateDepartment = asyncHandler(async (req, res) => {
    const department = await departmentService.updateDepartment(
      req.params.id,
      req.body,

    );

    res.status(200).json({
      success: true,
      message: "Department updated successfully",
      data: department,
    });
  });

  deleteDepartment = asyncHandler(async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({
      success: false,
      message: "Invalid department id",
      error : error,
    });
  }

  const department = await departmentService.deleteDepartment(id);

  res.status(200).json({
    success: true,
    message: "Department deleted successfully",
    data: department,
  });
});
}

export default new DepartmentController();