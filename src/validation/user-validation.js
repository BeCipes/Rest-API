import Joi from "joi"

const createUserValidation = Joi.object({
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().max(100).required(),
    email: Joi.string().max(100).required(),
    password: Joi.string().min(8).max(100).required(),
    photo: Joi.string().max(100)
})

const updateUserValidation = Joi.object({
    id: Joi.string().min(36).max(36).required(),
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().max(100).required(),
    email: Joi.string().max(100).required(),
    password: Joi.string().min(8).max(100).required(),
    photo: Joi.string().max(100)
})

const getUserValidation = Joi.string().min(36).max(36).required()

export {
    createUserValidation,
    updateUserValidation,
    getUserValidation
}