import Joi from "joi"

const registerUserValidation = Joi.object({
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().max(100).required(),
    email: Joi.string().max(100).required(),
    password: Joi.string().min(8).max(100).required()
})

const loginUserValidation = Joi.object({
    email: Joi.string().max(100).required(),
    password: Joi.string().min(8).max(100).required()
})

const forgotPasswordValidation = Joi.string().min(8).max(100).required()

export {
    registerUserValidation,
    loginUserValidation,
    forgotPasswordValidation
}