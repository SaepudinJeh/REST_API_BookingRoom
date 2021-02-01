const Joi = require("joi");

const userRegister = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.{8,})"))
    .message("You password must be at least 8 characters")
    .required(),
});

module.exports = {
  userRegister,
};
