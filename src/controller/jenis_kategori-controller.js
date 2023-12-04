import jenisKategoriService from "../service/jenis_kategori-service.js"
import { SuccessWebResponse } from "../helper/web-response.js"
import { getCurrentUserId } from "../helper/auth-util.js"

const createJenisKategori = async (req, res, next) => {
    try {
        const userId = await getCurrentUserId(req.get("Authorization"))
        const requestData = { ... req.body, createdBy: userId }

        const result = await jenisKategoriService.create(requestData)
        const response = SuccessWebResponse(200, "OK", "Success create new jenis kategori", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const updateJenisKategori = async (req, res, next) => {
    try {
        const jenisKategoriId = req.params.jenisKategoriId
        req.body.id = jenisKategoriId
        
        const result = await jenisKategoriService.update(req.body)
        const response = SuccessWebResponse(200, "OK", "Success update jenis kategori", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const deleteJenisKategori = async (req, res, next) => {
    try {
        const jenisKategoriId = req.params.jenisKategoriId
        
        const result = await jenisKategoriService.remove(jenisKategoriId)
        const response = SuccessWebResponse(200, "OK", "Success delete jenis kategori", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const getJenisKategoriById = async (req, res, next) => {
    try {
        const jenisKategoriId = req.params.jenisKategoriId
        const result = await jenisKategoriService.get(jenisKategoriId)
        const response = SuccessWebResponse(200, "OK", "Success get jenis kategori", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const getAllJenisKategori = async (req, res, next) => {
    try {
        const result = await jenisKategoriService.getAll()
        const response = SuccessWebResponse(200, "OK", "Success get all jenis kategori", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

export default {
    createJenisKategori,
    updateJenisKategori,
    deleteJenisKategori,
    getJenisKategoriById,
    getAllJenisKategori
}