import Joi from "joi"

const createKategoriResepValidation = Joi.object({
    nama_kategori: Joi.string().max(100).required(),
    gambar: Joi.string().max(100),
    id_jenis : Joi.number().min(1).positive().required()
})

const updateKategoriResepValidation = Joi.object({
    id: Joi.number().min(1).positive().required(),
    nama_kategori: Joi.string().max(100).required(),
    gambar: Joi.string().max(100),
    id_jenis: Joi.number().min(1).positive()
})

const getKategoriResepValidation = Joi.number().min(1).positive().required()

export {
    createKategoriResepValidation,
    updateKategoriResepValidation,
    getKategoriResepValidation
}