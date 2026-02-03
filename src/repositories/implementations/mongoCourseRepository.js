import ICourseRepository from "../contracts/PCourse.Repository.js";
import Course from "../../models/Course.model.js";

class MongoCourseRepository extends ICourseRepository {
  async create(data) {
    const newCourse = new Course(data);
   await newCourse.save();
   if (!newCourse) {
    throw new Error("Course creation failed");
   }
    return newCourse;

    
  }

  async findAll() {
    return await Course.find().sort({ createdAt: -1 });
  }

  async findById(id) {
    return await Course.findById(id);
  }

  async deleteById(id) {
    return await Course.findByIdAndDelete(id);
  }
}

export default MongoCourseRepository;