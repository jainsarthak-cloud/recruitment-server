import Joi from "joi";

const productSchema = Joi.object({
  name: Joi.string().min(2).required(),
  description: Joi.string().allow("").optional(),
  price: Joi.number().positive().required(),
});

export const validateProduct = (req, res, next) => {
  const { error } = productSchema.validate(req.body);

  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    });
  }

  next();
};


//joi is data validation library that helps to validate the data before it is processed by the controller. 
// it is used to validate the data in the request body, query parameters, and path parameters. 
// it is also used to validate the data in the response body. 
// it is a middleware that is used to validate the data before it is processed by the controller.