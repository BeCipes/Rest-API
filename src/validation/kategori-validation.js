import Joi from "joi"

const createKategoriValidation = Joi.object({
    nama_kategori: Joi.string().max(100).required(),
    gambar: Joi.string().max(100),
    id_jenis: Joi.number().min(1).positive().required(),
    createdBy: Joi.string().min(36).max(36).required(),
})

const updateKategoriValidation = Joi.object({
    id: Joi.number().min(1).positive().required(),
    nama_kategori: Joi.string().max(100).required(),
    gambar: Joi.string().max(100),
    id_jenis: Joi.number().min(1).positive(),
})

const getKategoriValidation = Joi.number().min(1).positive().required()

export {
    createKategoriValidation,
    updateKategoriValidation,
    getKategoriValidation
}