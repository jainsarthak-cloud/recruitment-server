import CourseService from "../services/Pcourses.services.js";

class CourseController {
  constructor() {
    // 1. Initialize the Service here
    this.courseService = new CourseService();
  }

  // NOTE: Use arrow functions (=>) to keep 'this' working correctly
  createCourse = async (req, res, next) => {
    try {
      const course = await this.courseService.createCourse(req.body);
      res.status(201).json({
        success: true,
        message: "Course created successfully",
        data: course
      });
    } catch (error) {
      next(error);
    }
  };

  getAllCourses = async (req, res, next) => {
    try {
      const courses = await this.courseService.getAllCourses();
      res.status(200).json({
        success: true,
        data: courses
      });
    } catch (error) {
      next(error);
    }
  };

  deleteCourse = async (req, res, next) => {
    try {
      await this.courseService.deleteCourse(req.params.id);
      res.status(200).json({
        success: true,
        message: "Course deleted successfully"
      });
    } catch (error) {
      next(error);
    }
  };
}

// Export a NEW INSTANCE so routes can use it directly
export default new CourseController();