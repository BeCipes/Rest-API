import Joi from "joi"

const createArtikelValidation = Joi.object({
    headline: Joi.string().max(100).required(),
    gambar: Joi.string().max(100).required(),
    isi: Joi.string().max(100).required(),
    penulis: Joi.string().max(100).required(),
    sumber: Joi.string().max(100).required(),
    id_kategori: Joi.number().min(1).positive().required(),
    createdBy: Joi.number().min(1).positive().required(),
})

const updateArtikelValidation = Joi.object({
    id: Joi.number().min(1).positive().required(),
    headline: Joi.string().max(100).required(),
    gambar: Joi.string().max(100).required(),
    isi: Joi.string().max(100).required(),
    penulis: Joi.string().max(100).required(),
    sumber: Joi.string().max(100).required(),
    id_kategori: Joi.number().min(1).positive().required(),
})

const getArtikelValidation = Joi.number().min(1).positive().required()

export {
    createArtikelValidation,
    updateArtikelValidation,
    getArtikelValidation
}