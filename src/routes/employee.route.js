import Router from "express";
import EmployeeController from "../controllers/employee.controller.js";
import {
  validateCreateEmployee,
  validateUpdateEmployee,
} from "../middlewares/validators/employee.validator.js";

const employeeRouter = Router();

const employeeController = new EmployeeController();

employeeRouter.post(
  "/",
  validateCreateEmployee,
  employeeController.createEmployee,
);
employeeRouter.get("/:employeeId", employeeController.getEmployee);
employeeRouter.patch("/:employeeId",validateUpdateEmployee, employeeController.updateEmployee,);
employeeRouter.delete(
  "/:employeeId",
  employeeController.deleteEmployee);

export default employeeRouter;
