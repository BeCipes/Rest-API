import bahanService from "../service/bahan-service.js"
import { SuccessWebResponse } from "../helper/web-response.js"
import { getCurrentUserId } from "../helper/auth-util.js"
import { getImageLink } from "../helper/image-helper.js"

const createBahan = async (req, res, next) => {
    try {
        const userId = await getCurrentUserId(req.get("Authorization"))
        const requestData = { ... req.body, createdBy: userId }

        const result = await bahanService.create(requestData)
        const response = SuccessWebResponse(200, "OK", "Success create new bahan", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const updateBahan = async (req, res, next) => {
    try {
        const bahanId = req.params.bahanId
        req.body.id = bahanId
        
        const result = await bahanService.update(req.body)
        const response = SuccessWebResponse(200, "OK", "Success update bahan", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const deleteBahan = async (req, res, next) => {
    try {
        const bahanId = req.params.bahanId
        
        const result = await bahanService.remove(bahanId)
        const response = SuccessWebResponse(200, "OK", "Success delete bahan", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const getBahanById = async (req, res, next) => {
    try {
        const bahanId = req.params.bahanId
        const result = await bahanService.get(bahanId)
        result.gambar = await getImageLink(result.gambar)

        const response = SuccessWebResponse(200, "OK", "Success get bahan", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const getAllBahan = async (req, res, next) => {
    try {
        const result = await bahanService.getAll()
        
        await Promise.all(result.map(async (item) => {
            item.gambar = await getImageLink(item.gambar)

            return item
        }))

        const response = SuccessWebResponse(200, "OK", "Success get all bahan", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

export default {
    createBahan,
    updateBahan,
    deleteBahan,
    getBahanById,
    getAllBahan
}