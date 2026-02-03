import MongoCourseRepository from "../repositories/implementations/mongoCourseRepository.js";
import { AppError } from "../utils/errors.js";

class CourseService {
  constructor() {
    // 1. Initialize the Repository here
    this.courseRepository = new MongoCourseRepository();
  }

  async createCourse(courseData) {
    // Business Logic: Price check
    if (courseData.price < 0) {
      throw new AppError("Price cannot be negative", 400);
    }

    const newCourse = await this.courseRepository.create(courseData);
    return newCourse;
  }

  async getAllCourses() {
    return await this.courseRepository.findAll();
  }

  async getCourseById(id) {
    const course = await this.courseRepository.findById(id);
    if (!course) throw new AppError("Course not found", 404);
    return course;
  }

  async deleteCourse(id) {
    // Business Logic: Check existence before delete
    const course = await this.courseRepository.findById(id);
    if (!course) throw new AppError("Course not found", 404);
    return await this.courseRepository.deleteById(id);
  }
}

export default CourseService;