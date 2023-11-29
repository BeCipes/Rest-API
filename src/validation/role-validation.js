import Joi from "joi"

const createRoleValidation = Joi.object({
    role_name: Joi.string().max(100).required()
})

const updateRoleValidation = Joi.object({
    id_role: Joi.number().min(1).positive().required(),
    role_name: Joi.string().max(100).required()
})

const getRoleValidation = Joi.number().min(1).positive().required()

export {
    createRoleValidation,
    updateRoleValidation,
    getRoleValidation
}