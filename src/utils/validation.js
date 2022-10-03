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
const createBlogValidation = Joi.object({
    title: Joi.string().min(10).max(150).required(),
    body: Joi.string().min(6).max(5030).required(),
    category: Joi.string().required()
})
module.exports = {
    loginValidation, registerValidation,createBlogValidation
}