import Joi from "joi"

const createKategoriResepValidation = Joi.object({
    id_kategori: Joi.number().min(1).positive().required(),
    id_resep: Joi.number().min(1).positive().required(),
    createdBy: Joi.number().min(1).positive().required(),
})

const updateKategoriResepValidation = Joi.object({
    id: Joi.number().min(1).positive().required(),
    id_kategori: Joi.number().min(1).positive().required(),
    id_resep: Joi.number().min(1).positive().required(),
})

const getKategoriResepValidation = Joi.number().min(1).positive().required()

export {
    createKategoriResepValidation,
    updateKategoriResepValidation,
    getKategoriResepValidation
}