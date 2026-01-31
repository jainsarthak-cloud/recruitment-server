import express from "express";
import taskController from "../controllers/task.controller.js";

const router = express.Router();

router.post("/", taskController.createTask);

router.get("/:id", taskController.getSingleTask);

router.get("/", taskController.getAllTasks);

router.put("/update/:id", taskController.updateTask);

router.delete("/delete/:id", taskController.deleteTask);

export default router;
