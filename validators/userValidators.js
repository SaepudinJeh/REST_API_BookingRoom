const Joi = require("joi");

const costumerRegister = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.{5,})"))
    .message("You password must be at least 5 characters")
    .required(),
});

const ownerRegister = Joi.object({
  fullName: Joi.string().required(),
  email: Joi.string().email().required(),
  phoneNumber: Joi.string().required(),
  password: Joi.string()
    .pattern(new RegExp("^(?=.{5,})"))
    .message("You password must be at least 5 characters")
    .required(),
});

module.exports = {
  costumerRegister,
  ownerRegister
};
