import Joi from "joi"

const createFavoriteValidation = Joi.object({
    id_user: Joi.string().min(36).max(36).required(),
    id_resep: Joi.number().min(1).positive().required(),
    createdBy: Joi.string().min(36).max(36).required(),
})

const getFavoriteValidation = Joi.number().min(1).positive().required()

const getFavoriteValidationUser = Joi.string().min(36).max(36).required()

export {
    createFavoriteValidation,
    getFavoriteValidationUser,
    getFavoriteValidation
}