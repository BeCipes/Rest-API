import Joi from "joi"

const createTeknikValidation = Joi.object({
    title: Joi.string().max(100).required(),
    description: Joi.string().max(100).required(),
    cover: Joi.string().max(255).required(),
    url: Joi.string().max(100).required(),
    sumber: Joi.string().max(100).required(),
    id_kategori: Joi.number().min(1).positive().required(),
    createdBy: Joi.string().min(36).max(36).required(),
})

const updateTeknikValidation = Joi.object({
    id: Joi.number().min(1).positive().required(),
    title: Joi.string().max(100).required(),
    description: Joi.string().max(100).required(),
    cover: Joi.string().max(255).required(),
    url: Joi.string().max(100).required(),
    sumber: Joi.string().max(100).required(),
    id_kategori: Joi.number().min(1).positive().required(),
})

const getTeknikValidation = Joi.number().min(1).positive().required()

export {
    createTeknikValidation,
    updateTeknikValidation,
    getTeknikValidation
}