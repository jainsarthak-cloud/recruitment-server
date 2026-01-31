import MongoTaskRepository from "../repositories/implementations/mongoTaskRepository.js";
import { AppError } from "../utils/errors.js";

const taskRepo = new MongoTaskRepository();

class TaskService {
  async createTask(data) {
    if (!data.title) {
      throw new AppError("Task title is required", 400);
    }

    const taskData = {
      title: data.title,
      description: data.description,
      status: data.status,
    };

    return await taskRepo.createTask(taskData);
  }

  async getTaskById(id) {
    const task = await taskRepo.findTaskById(id);
    if (!task) {
      throw new AppError("Task not found", 404);
    }
    return task;
  }

  async getAllTasks() {
    return await taskRepo.findAllTasks();
  }

  async updateTask(id, taskData) {
    let updated = await taskRepo.updateTask(id, taskData);
    if (!updated) {
      throw new AppError("Skill not found or delete failed", 404);
    }
    return updated;
  }

  async deleteTask(id) {
    let deleted = await taskRepo.deleteTask(id);
    if (!deleted) {
      throw new AppError("Task not found or delete failed", 404);
    }
    return deleted;
  }
}

export default new TaskService();
