import Joi from "joi"

const createJenisKategoriValidation = Joi.object({
    nama_jenis: Joi.string().max(100).required()
})

const updateJenisKategoriValidation = Joi.object({
    id: Joi.number().min(1).positive().required(),
    nama_jenis: Joi.string().max(100).required()
})

const getJenisKategoriValidation = Joi.number().min(1).positive().required()

export {
    createJenisKategoriValidation,
    updateJenisKategoriValidation,
    getJenisKategoriValidation
}