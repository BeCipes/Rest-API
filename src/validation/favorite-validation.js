import Joi from "joi"

const createFavoriteValidation = Joi.object({
    id_user: Joi.number().min(1).positive().required(),
    id_resep: Joi.number().min(1).positive().required(),
    createdBy: Joi.number().min(1).positive().required(),
})

const updateFavoriteValidation = Joi.object({
    id: Joi.number().min(1).positive().required(),
    id_user: Joi.number().min(1).positive().required(),
    id_resep: Joi.number().min(1).positive().required(),
})

const getFavoriteValidation = Joi.number().min(1).positive().required()

export {
    createFavoriteValidation,
    updateFavoriteValidation,
    getFavoriteValidation
}