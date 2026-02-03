import express from 'express';
// Ensure this path matches your actual file name!
import courseController from '../controllers/p.course.controller.js';
// import { validateCreateCourse } from '../middlewares/validators/course.validator.js';

const router = express.Router();

router.post('/', courseController.createCourse);
router.get('/', courseController.getAllCourses);
router.delete('/:id', courseController.deleteCourse);

export default router;