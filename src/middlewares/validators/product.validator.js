import Joi from "joi";
import { AppError } from "../../utils/errors.js";

const createProductSchema = Joi.object({
  name: Joi.string().required(),
  description: Joi.string().optional(),
  price: Joi.number().required(),
  stock: Joi.number().optional(),
  category: Joi.string().optional(),
  images: Joi.array().items(Joi.string()).optional(),
});

const updateProductSchema = Joi.object({
  name: Joi.string().optional(),
  description: Joi.string().optional(),
  price: Joi.number().optional(),
  stock: Joi.number().optional(),
  category: Joi.string().optional(),
  images: Joi.array().items(Joi.string()).optional(),
});

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false });
  if (error) 
    return next(new AppError(error.details.map(d => d.message).join(", "), 400));

  next();
};

export const createProductValidator = validate(createProductSchema);
export const updateProductValidator = validate(updateProductSchema);
