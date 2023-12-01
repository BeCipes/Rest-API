import kategoriResepService from "../service/kategori_resep-service.js"
import { SuccessWebResponse } from "../helper/web-response.js"

const createKategoriResep = async (req, res, next) => {
    try {
        const result = await kategoriResepService.create(req.body)
        const response = SuccessWebResponse(200, "OK", "Success create new kategori resep", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const updateKategoriResep = async (req, res, next) => {
    try {
        const kategoriResepId = req.params.kategoriResepId
        req.body.id_kategori_resep = kategoriResepId
        
        const result = await kategoriResepService.update(req.body)
        const response = SuccessWebResponse(200, "OK", "Success update kategori resep", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const deleteKategoriResep = async (req, res, next) => {
    try {
        const kategoriResepId = req.params.kategoriResepId
        const result = await kategoriResepService.remove(kategoriResepId)
        const response = SuccessWebResponse(200, "OK", "Success delete kategori resep", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const getKategoriResepById = async (req, res, next) => {
    try {
        const kategoriResepId = req.params.kategoriResepId
        const result = await kategoriResepService.get(kategoriResepId)
        const response = SuccessWebResponse(200, "OK", "Success get kategori resep", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const getAllKategoriResep = async (req, res, next) => {
    try {
        const result = await kategoriResepService.getAll()
        const response = SuccessWebResponse(200, "OK", "Success get all kategori resep", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

export default {
    createKategoriResep,
    updateKategoriResep,
    deleteKategoriResep,
    getKategoriResepById,
    getAllKategoriResep
}