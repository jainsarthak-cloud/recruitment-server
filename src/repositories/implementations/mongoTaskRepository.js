import Task from "../../models/task.model.js";
import ITaskRepository from "../contracts/ITaskRepository.js";
import { AppError } from "../../utils/errors.js";
import mongoose from "mongoose";

class MongoTaskRepository extends ITaskRepository {
  async createTask(taskData) {
    try {
      return await Task.create(taskData);
    } catch (error) {
      throw new AppError("Failed to create task", 500);
    }
  }

  async findTaskById(id) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid Task id", 400);
    }
    try {
      return await Task.findById(id).lean();
    } catch (error) {
      throw new AppError("Failed to find task", 500);
    }
  }

  async findAllTasks() {
    try {
      return await Task.find();
    } catch (error) {
      throw new AppError("Failed to fetch tasks", 500);
    }
  }

  async updateTask(id, taskData) {
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new AppError("Invalid Task ID", 400);
    }
    try {
      return await Task.findByIdAndUpdate(id, taskData, {
        new: true,
      }).lean();
    } catch (error) {
      throw new AppError("Failed to update task", 500);
    }
  }

  async deleteTask(id){
    if(!mongoose.Types.ObjectId.isValid(id)){
      throw new AppError("Invalid Task ID", 400);
    }
    try {
      return await Task.findByIdAndDelete(id).lean()
    } catch (error) {
      throw new AppError("Failed to delete task", 500);
    }
  }
}

export default MongoTaskRepository;
