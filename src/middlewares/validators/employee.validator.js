import joi from "joi";

const createEmployeeSchema = joi.object({
  employeeName: joi.string().required(),
  email: joi.string().email().required(),
  password: joi.string().min(6).required(),
  phoneNumber: joi.string().min(10).max(10),
  employeeRole: joi.string(),
});

const updateEmployeeSchema = joi.object({
  employeeName: joi.string(),
  email: joi.string().email(),
  password: joi.string().min(6),
});

const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};

export const validateCreateEmployee = validate(createEmployeeSchema);
export const validateUpdateEmployee = validate(updateEmployeeSchema);
