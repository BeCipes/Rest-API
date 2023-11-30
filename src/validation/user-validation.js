import Joi from "joi"

const createUserValidation = Joi.object({
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().max(100).required(),
    email: Joi.string().max(100).required(),
    password: Joi.string().max(100).required()
})

const updateUserValidation = Joi.object({
    id_user: Joi.number().min(1).positive().required(),
    first_name: Joi.string().max(100).required(),
    last_name: Joi.string().max(100).required(),
    email: Joi.string().max(100).required(),
    password: Joi.string().max(100).required()
})

const getUserValidation = Joi.number().min(1).positive().required()

export {
    createUserValidation,
    updateUserValidation,
    getUserValidation
}