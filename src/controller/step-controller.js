import stepService from "../service/step-service.js"
import { SuccessWebResponse } from "../helper/web-response.js"
import { getCurrentUserId } from "../helper/auth-util.js"

const createStep = async (req, res, next) => {
    try {
        const userId = await getCurrentUserId(req.get("Authorization"))
        const requestData = { ... req.body, createdBy: userId }

        const result = await stepService.create(requestData)
        const response = SuccessWebResponse(200, "OK", "Success create new step", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const updateStep = async (req, res, next) => {
    try {
        const stepId = req.params.stepId
        req.body.id = stepId

        const resepId = req.params.resepId
        req.body.id_resep = resepId
        
        const result = await stepService.update(req.body)
        const response = SuccessWebResponse(200, "OK", "Success update step", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const deleteStep = async (req, res, next) => {
    try {
        const stepId = req.params.stepId
        
        const result = await stepService.remove(stepId)
        const response = SuccessWebResponse(200, "OK", "Success delete step", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const getStepById = async (req, res, next) => {
    try {
        const stepId = req.params.stepId
        const result = await stepService.get(stepId)
        const response = SuccessWebResponse(200, "OK", "Success get step", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const getStepByIdResep = async (req, res, next) => {
    try {
        const resepId = req.params.resepId
        const result = await stepService.getByResep(resepId)
        const response = SuccessWebResponse(200, "OK", "Success get all step by id resep", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const getAllStep = async (req, res, next) => {
    try {
        const result = await stepService.getAll()
        const response = SuccessWebResponse(200, "OK", "Success get all step", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

export default {
    createStep,
    updateStep,
    deleteStep,
    getStepById,
    getStepByIdResep,
    getAllStep
}