import Joi from "joi"

const createFavoriteValidation = Joi.object({
    id_user: Joi.number().min(1).positive().required(),
    id_resep: Joi.number().min(1).positive().required(),
    createdBy: Joi.string().min(36).max(36).required(),
})

const getFavoriteValidation = Joi.number().min(1).positive().required()

export {
    createFavoriteValidation,
    getFavoriteValidation
}