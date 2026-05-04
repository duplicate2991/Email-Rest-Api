const Joi = require('joi');

exports.createUserSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required()
});
