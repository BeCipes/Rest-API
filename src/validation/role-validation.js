import Joi from "joi"

const createRoleValidation = Joi.object({
    role_name: Joi.string().max(100).required()
})

export {
    createRoleValidation
}