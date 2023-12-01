import Joi from "joi"

const createKategoriResepValidation = Joi.object({
    nama_kategori: Joi.string().max(100).required(),
    gambar: Joi.string().max(100)
})

const updateKategoriResepValidation = Joi.object({
    id_kategori_resep: Joi.number().min(1).positive().required(),
    nama_kategori: Joi.string().max(100).required(),
    gambar: Joi.string().max(100)
})

const getKategoriResepValidation = Joi.number().min(1).positive().required()

export {
    createKategoriResepValidation,
    updateKategoriResepValidation,
    getKategoriResepValidation
}