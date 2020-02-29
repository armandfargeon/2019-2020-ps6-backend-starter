const Joi = require('joi')
const BaseModel = require('../utils/base-model.js')

module.exports = new BaseModel('User', {
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  username: Joi.string().required(),
  password: Joi.string().min(3).max(15).required(),
  streetAddress: Joi.string(),
  city: Joi.string(),
  zipCode: Joi.string(),
  country: Joi.string(),
})
