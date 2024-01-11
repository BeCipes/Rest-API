import resepService from "../service/resep-service.js"
import { SuccessWebResponse } from "../helper/web-response.js"
import { getCurrentUserId } from "../helper/auth-util.js"
import { getImageLink } from "../helper/image-helper.js"

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
        result.gambar = await getImageLink(result.gambar)

        const response = SuccessWebResponse(200, "OK", "Success get resep", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const getResepByIdKategori = async (req, res, next) => {
    try {
        const kategoriId = req.params.kategoriId
        const result = await resepService.getByIdKategori(kategoriId)

        await Promise.all(result.map(async (item) => {
            item.gambar = await getImageLink(item.gambar)

            return item
        }))

        const response = SuccessWebResponse(200, "OK", "Success get resep by kategori", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const getAllResep = async (req, res, next) => {
    try {
        const result = await resepService.getAll()

        await Promise.all(result.map(async (item) => {
            item.gambar = await getImageLink(item.gambar)

            return item
        }))
        
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
    getResepByIdKategori,
    getAllResep
}