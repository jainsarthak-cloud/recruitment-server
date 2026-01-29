import express from 'express'
import HJobCategoryController from '../controllers/hJodCategory.controller.js'
import { authenticateJWT } from '../middlewares/auth.middleware.js'
import { authorize } from '../middlewares/role.middleware.js'
import { createJobCategoryValidator } from '../middlewares/validators/jobCategory.validator.js'
import { updateJobCategoryValidator } from '../middlewares/validators/jobCategory.validator.js'


const router = express.Router()

router.use(authenticateJWT)

router.post(
    '/',
    authorize("admin"),
    createJobCategoryValidator,
    HJobCategoryController.create
)

router.get(
    "/",
    HJobCategoryController.get
)

router.get(
    "/:id",
    HJobCategoryController.getById
)

router.put(
    "/:id",
    authorize("admin"),
    updateJobCategoryValidator,
    HJobCategoryController.update
)

router.delete(
    "/:id",
    authorize("admin"),
    HJobCategoryController.delete
)


export default router