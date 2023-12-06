import resepService from "../service/resep-service.js"
import { SuccessWebResponse } from "../helper/web-response.js"
import { getCurrentUserId } from "../helper/auth-util.js"

const createResep = async (req, res, next) => {
    try {
        const userId = await getCurrentUserId(req.get("Authorization"))
        const requestData = { ...req.body, createdBy: userId }

        const result = await resepService.create(requestData)
        const response = SuccessWebResponse(200, "OK", "Success create new resep", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const updateResep = async (req, res, next) => {
    try {
        const resepId = req.params.resepId
        req.body.id = resepId
        
        const result = await resepService.update(req.body)
        const response = SuccessWebResponse(200, "OK", "Success update resep", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const deleteResep = async (req, res, next) => {
    try {
        const resepId = req.params.resepId
        const result = await resepService.remove(resepId)
        const response = SuccessWebResponse(200, "OK", "Success delete resep", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const getResepById = async (req, res, next) => {
    try {
        const resepId = req.params.resepId
        const result = await resepService.get(resepId)
        const response = SuccessWebResponse(200, "OK", "Success get resep", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const getAllResep = async (req, res, next) => {
    try {
        const result = await resepService.getAll()
        const response = SuccessWebResponse(200, "OK", "Success get all resep", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

export default {
    createResep,
    updateResep,
    deleteResep,
    getResepById,
    getAllResep
}