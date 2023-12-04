import favoriteService from "../service/favorite-service.js"
import { SuccessWebResponse } from "../helper/web-response.js"

const createFavorite = async (req, res, next) => {
    try {
        const result = await favoriteService.create(req.body)
        const response = SuccessWebResponse(200, "OK", "Success create new favorite", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const updateFavorite = async (req, res, next) => {
    try {
        const favoriteId = req.params.favoriteId
        req.body.id = favoriteId
        
        const result = await favoriteService.update(req.body)
        const response = SuccessWebResponse(200, "OK", "Success update favorite", result)

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

const getFavoriteById = async (req, res, next) => {
    try {
        const favoriteId = req.params.favoriteId
        const result = await favoriteService.get(favoriteId)
        const response = SuccessWebResponse(200, "OK", "Success get favorite", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const getAllFavorite = async (req, res, next) => {
    try {
        const result = await favoriteService.getAll()
        const response = SuccessWebResponse(200, "OK", "Success get all favorite", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

export default {
    createFavorite,
    updateFavorite,
    deleteFavorite,
    getFavoriteById,
    getAllFavorite
}