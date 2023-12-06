import Joi from "joi"

const createResepValidation = Joi.object({
    nama_resep: Joi.string().max(100).required(),
    deskripsi: Joi.string().max(100).required(),
    gambar: Joi.string().max(100).required(),
    bahan: Joi.string().max(100).required(),
    informasi_gizi: Joi.string().max(100).required(),
    createdBy: Joi.number().min(1).positive().required(),
})

const updateResepValidation = Joi.object({
    id: Joi.number().min(1).positive().required(),
    nama_resep: Joi.string().max(100).required(),
    deskripsi: Joi.string().max(100).required(),
    gambar: Joi.string().max(100).required(),
    bahan: Joi.string().max(100).required(),
    informasi_gizi: Joi.string().max(100).required(),
})

const getResepValidation = Joi.number().min(1).positive().required()

export {
    createResepValidation,
    updateResepValidation,
    getResepValidation
}