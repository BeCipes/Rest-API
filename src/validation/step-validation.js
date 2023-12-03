import Joi from "joi"

const creStepsepValidation = Joi.object({
    id_resep: Joi.number().min(1).positive().required(),
    step_no: Joi.string().max(2).required(),
    step_desc: Joi.string().max(100).required(),
    waktu: Joi.string().max(100).required(),
})

const updStepsepValidation = Joi.object({
    id: Joi.number().min(1).positive().required(),
    id_resep: Joi.number().min(1).positive().required(),
    step_no: Joi.string().max(2).required(),
    step_desc: Joi.string().max(100).required(),
    waktu: Joi.string().max(100).required(),
})

const getStepValidation = Joi.number().min(1).positive().required()

export {
    creStepsepValidation,
    updStepsepValidation,
    getStepValidation
}