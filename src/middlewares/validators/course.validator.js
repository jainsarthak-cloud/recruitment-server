const Joi = require('joi');

const createCourseSchema = Joi.object({
    title: Joi.string().min(3).required(),
    price: Joi.number().min(0).required(),
    description: Joi.string().min(10).required()
});

exports.validateCreateCourse = (req, res, next) => {
    const { error } = createCourseSchema.validate(req.body);
    if (error) {
        return res.status(400).json({
            success: false,
            message: "Validation Error",
            error: error.details[0].message
        });
    }
    next();
};