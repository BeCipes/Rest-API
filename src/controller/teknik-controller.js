import teknikService from "../service/teknik-service.js"
import { SuccessWebResponse } from "../helper/web-response.js"
import { getCurrentUserId } from "../helper/auth-util.js"
import { getImageLink } from "../helper/image-helper.js"

const createTeknik = async (req, res, next) => {
    try {
        const userId = await getCurrentUserId(req.get("Authorization"))
        const requestData = { ... req.body, createdBy: userId }

        const result = await teknikService.create(requestData)
        const response = SuccessWebResponse(200, "OK", "Success create new teknik", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const updateTeknik = async (req, res, next) => {
    try {
        const teknikId = req.params.teknikId
        req.body.id = teknikId
        
        const result = await teknikService.update(req.body)
        const response = SuccessWebResponse(200, "OK", "Success update teknik", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const deleteTeknik = async (req, res, next) => {
    try {
        const teknikId = req.params.teknikId
        
        const result = await teknikService.remove(teknikId)
        const response = SuccessWebResponse(200, "OK", "Success delete teknik", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const getTeknikById = async (req, res, next) => {
    try {
        const teknikId = req.params.teknikId
        const result = await teknikService.get(teknikId)
        result.cover = await getImageLink(result.cover)

        const response = SuccessWebResponse(200, "OK", "Success get teknik", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const getAllTeknik = async (req, res, next) => {
    try {
        const result = await teknikService.getAll()
        
        await Promise.all(result.map(async (item) => {
            item.cover = await getImageLink(item.cover)

            return item
        }))

        const response = SuccessWebResponse(200, "OK", "Success get all teknik", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

export default {
    createTeknik,
    updateTeknik,
    deleteTeknik,
    getTeknikById,
    getAllTeknik
}