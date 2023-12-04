import kategoriService from "../service/kategori-service.js"
import { SuccessWebResponse } from "../helper/web-response.js"
import { getCurrentUserId } from "../helper/auth-util.js"

const createKategori = async (req, res, next) => {
    try {
        const userId = await getCurrentUserId(req.get("Authorization"))
        const requestData = { ...req.body, createdBy: userId }
        
        const result = await kategoriService.create(requestData)
        const response = SuccessWebResponse(200, "OK", "Success create new kategori", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const updateKategori = async (req, res, next) => {
    try {
        const kategoriId = req.params.kategoriId
        req.body.id = kategoriId
        
        const result = await kategoriService.update(req.body)
        const response = SuccessWebResponse(200, "OK", "Success update kategori", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const deleteKategori = async (req, res, next) => {
    try {
        const kategoriId = req.params.kategoriId
        const result = await kategoriService.remove(kategoriId)
        const response = SuccessWebResponse(200, "OK", "Success delete kategori", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const getKategoriById = async (req, res, next) => {
    try {
        const kategoriId = req.params.kategoriId
        const result = await kategoriService.get(kategoriId)
        const response = SuccessWebResponse(200, "OK", "Success get kategori", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const getAllKategori = async (req, res, next) => {
    try {
        const result = await kategoriService.getAll()
        const response = SuccessWebResponse(200, "OK", "Success get all kategori", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

export default {
    createKategori,
    updateKategori,
    deleteKategori,
    getKategoriById,
    getAllKategori
}