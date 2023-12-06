import favoriteService from "../service/favorite-service.js"
import { SuccessWebResponse } from "../helper/web-response.js"
import { getCurrentUserId } from "../helper/auth-util.js"

const createFavorite = async (req, res, next) => {
    try {
        const userId = await getCurrentUserId(req.get("Authorization"))
        const requestData = { ...req.body, createdBy: userId }
        
        const result = await favoriteService.create(requestData)
        const response = SuccessWebResponse(200, "OK", "Success create new favorite", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const deleteFavorite = async (req, res, next) => {
    try {
        const favoriteId = req.params.favoriteId
        const result = await favoriteService.remove(favoriteId)
        const response = SuccessWebResponse(200, "OK", "Success delete favorite", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

// const getFavoriteById = async (req, res, next) => {
//     try {
//         const favoriteId = req.params.favoriteId
//         const result = await favoriteService.get(favoriteId)
//         const response = SuccessWebResponse(200, "OK", "Success get favorite", result)

//         res.status(200).json(response)
//     } catch (e) {
//         next(e)
//     }
// }

const getFavoriteByIdUser = async (req, res, next) => {
    try {
        const userId = await getCurrentUserId(req.get("Authorization"))
        const result = await favoriteService.getByUserId(userId)
        const response = SuccessWebResponse(200, "OK", "Success get favorite", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

// const getAllFavorite = async (req, res, next) => {
//     try {
//         const result = await favoriteService.getAll()
//         const response = SuccessWebResponse(200, "OK", "Success get all favorite", result)

//         res.status(200).json(response)
//     } catch (e) {
//         next(e)
//     }
// }

export default {
    createFavorite,
    deleteFavorite,
    // getFavoriteById,
    getFavoriteByIdUser,
    // getAllFavorite
}