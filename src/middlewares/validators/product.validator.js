import joi from "joi";

export const createProductValidator = joi
  .object({
    name: joi.string().trim().min(2).max(100).required(),
    description: joi.string().trim().min(5).required(),
    price: joi.number().precision(2).min(0).required(),
  })

  .options({
    abortEarly: false, // all errors at once
    allowUnknown: false, // extra fields not allowed
  });

export const updatedProdectValidator = joi
  .object({
    name: joi.string().trim().min(2).max(100),
    description: joi.string().trim().min(5),
    price: joi.number().precision(2).min(0),
  })
  .min(1) // at least one field must be updated
  .options({
    abortEarly: false,
    allowUnknown: false,
  });
