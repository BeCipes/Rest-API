import Joi from "joi"

const createArtikelValidation = Joi.object({
    headline: Joi.string().max(100).required(),
    image: Joi.string().max(100).required(),
    content: Joi.string().max(100).required(),
    writer: Joi.string().max(100).required(),
    source: Joi.string().max(100).required(),
    category: Joi.string().max(100).required(),
    created_by: Joi.string().max(100).required(),
})

const updateArtikelValidation = Joi.object({
    id_artikel: Joi.number().min(1).positive().required(),
    headline: Joi.string().max(100).required(),
    image: Joi.string().max(100).required(),
    content: Joi.string().max(100).required(),
    writer: Joi.string().max(100).required(),
    source: Joi.string().max(100).required(),
    category: Joi.string().max(100).required()
})

const getArtikelValidation = Joi.number().min(1).positive().required()

export {
    createArtikelValidation,
    updateArtikelValidation,
    getArtikelValidation
}