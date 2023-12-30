import Joi from "joi"

const createResepValidation = Joi.object({
    nama_resep: Joi.string().max(100).required(),
    deskripsi: Joi.string().max(100).required(),
    gambar: Joi.string().max(255).required(),
    bahan: Joi.array().max(100).required(),
    informasi_gizi: Joi.object().max(100).required(),
    createdBy: Joi.string().min(36).max(36).required(),
})

const updateResepValidation = Joi.object({
    id: Joi.number().min(1).positive().required(),
    nama_resep: Joi.string().max(100).required(),
    deskripsi: Joi.string().max(100).required(),
    gambar: Joi.string().max(255).required(),
    bahan: Joi.array().max(100).required(),
    informasi_gizi: Joi.object().max(100).required()
})

const getResepValidation = Joi.number().min(1).positive().required()

export {
    createResepValidation,
    updateResepValidation,
    getResepValidation
}