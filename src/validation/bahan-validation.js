import Joi from "joi"

const createBahanValidation = Joi.object({
    nama_bahan: Joi.string().max(100).required(),
    deskripsi: Joi.string().max(100).required(),
    gambar: Joi.string().max(100).required(),
    gizi: Joi.string().max(100).required(),
})

const updateBahanValidation = Joi.object({
    id: Joi.number().min(1).positive().required(),
    nama_bahan: Joi.string().max(100).required(),
    deskripsi: Joi.string().max(100).required(),
    gambar: Joi.string().max(100).required(),
    gizi: Joi.string().max(100).required(),
})

const getBahanValidation = Joi.number().min(1).positive().required()

export {
    createBahanValidation,
    updateBahanValidation,
    getBahanValidation
}