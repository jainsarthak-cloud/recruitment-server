import express from "express";
import { authenticateJWT } from "../middlewares/auth.middleware.js";
import DepartmentController from "../controllers/nimishaDepartment.controller.js";

const router = express.Router();

router.post("/create",DepartmentController.createDepartment);
router.get("/get", authenticateJWT, DepartmentController.getDepartments);

router.put("/update/:id", authenticateJWT, DepartmentController.updateDepartment);
router.delete("/delete/:id", authenticateJWT, DepartmentController.deleteDepartment);

export default router;