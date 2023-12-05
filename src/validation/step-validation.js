import Joi from "joi"

const createStepValidation = Joi.object({
    id_resep: Joi.number().min(1).positive().required(),
    step_no: Joi.number().min(1).positive().required(),
    step_desc: Joi.string().max(100).required(),
    waktu: Joi.number().min(1).positive().required(),
    createdBy: Joi.number().min(1).positive().required(),
})

const updateStepValidation = Joi.object({
    id: Joi.number().min(1).positive().required(),
    id_resep: Joi.number().min(1).positive().required(),
    step_no: Joi.number().min(1).positive().required(),
    step_desc: Joi.string().max(100).required(),
    waktu: Joi.number().min(1).positive().required(),
})

const getStepValidation = Joi.number().min(1).positive().required()

export {
    createStepValidation,
    updateStepValidation,
    getStepValidation
}