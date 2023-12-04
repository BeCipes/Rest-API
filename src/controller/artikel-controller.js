import artikelService from "../service/artikel-service.js"
import { SuccessWebResponse } from "../helper/web-response.js"
import { getCurrentUserId } from "../helper/auth-util.js"

const createArtikel = async (req, res, next) => {
    try {
        const userId = await getCurrentUserId(req.get("Authorization"))
        const requestData = { ... req.body, createdBy: userId }

        const result = await artikelService.create(requestData)
        const response = SuccessWebResponse(200, "OK", "Success create new artikel", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const updateArtikel = async (req, res, next) => {
    try {
        const artikelId = req.params.artikelId
        req.body.id = artikelId
        
        const result = await artikelService.update(req.body)
        const response = SuccessWebResponse(200, "OK", "Success update artikel", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const deleteArtikel = async (req, res, next) => {
    try {
        const artikelId = req.params.artikelId
        
        const result = await artikelService.remove(artikelId)
        const response = SuccessWebResponse(200, "OK", "Success delete artikel", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const getArtikelById = async (req, res, next) => {
    try {
        const artikelId = req.params.artikelId
        const result = await artikelService.get(artikelId)
        const response = SuccessWebResponse(200, "OK", "Success get artikel", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const getAllArtikel = async (req, res, next) => {
    try {
        const result = await artikelService.getAll()
        const response = SuccessWebResponse(200, "OK", "Success get all artikel", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

export default {
    createArtikel,
    updateArtikel,
    deleteArtikel,
    getArtikelById,
    getAllArtikel
}