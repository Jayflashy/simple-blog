const Joi = require('joi')

const loginValidation = Joi.object({
    username: Joi.string().min(4).max(30).required(),
    password: Joi.string().min(6).max(30).required()
})
const registerValidation = Joi.object({
    username: Joi.string().min(4).max(30).required(),
    password: Joi.string().min(6).required(),
    name: Joi.string().min(6).max(50).required(),
    email: Joi.string().email().min(6).required().lowercase()
})
module.exports = {
    loginValidation, registerValidation
}