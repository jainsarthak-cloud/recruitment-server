import taskService from "../services/task.service.js";

class TaskController {
  async createTask(req, res, next) {
    try {
      const task = await taskService.createTask(req.body);
      res.status(201).json({
        success: true,
        data: task,
      });
    } catch (error) {
      next(error);
    }
  }
  async getSingleTask(req, res, next) {
          try {
              const task = await taskService.getTaskById(req.params.id);
              res.status(200).json({ success: true, data: task });
          } catch (error) {
              next(error);
          }
      }

  async getAllTasks(req, res, next){
    try {
      const tasks = await taskService.getAllTasks()

      res.status(200).json({success: true, data: tasks})
    } catch (error) {
      next(error)
    }
  }

  async updateTask(req, res, next){
    try {
      const updatedTasks = await taskService.updateTask(req.params.id, req.body);
      res.status(201).json({
        success: true,
        data: updatedTasks,
      });
    } catch (error) {
      next(error)
    }
  }

  async deleteTask(req, res, next){
    try {
      await taskService.deleteTask(req.params.id);
      res.status(200).json({
        success:true
      })
    } catch (error) {
      next(error);
    }
  }
}

export default new TaskController();
