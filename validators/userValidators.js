const Joi = require("joi");

const userRegister = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.{5,})"))
    .message("You password must be at least 5 characters")
    .required(),
});

module.exports = {
  userRegister,
};
