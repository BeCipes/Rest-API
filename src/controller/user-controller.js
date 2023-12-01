import userService from "../service/user-service.js"
import { SuccessWebResponse } from "../helper/web-response.js"

const createUser = async (req, res, next) => {
    try {
        const result = await userService.create(req.body)
        const response = SuccessWebResponse(200, "OK", "Success create new user", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const updateUser = async (req, res, next) => {
    try {
        const userId = req.params.userId
        req.body.id_user = userId
        
        const result = await userService.update(req.body)
        const response = SuccessWebResponse(200, "OK", "Success update user", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const result = await userService.remove(userId)
        const response = SuccessWebResponse(200, "OK", "Success delete user", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const getUserById = async (req, res, next) => {
    try {
        const userId = req.params.userId
        const result = await userService.get(userId)
        const response = SuccessWebResponse(200, "OK", "Success get user", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const getAllUser = async (req, res, next) => {
    try {
        const result = await userService.getAll()
        const response = SuccessWebResponse(200, "OK", "Success get all user", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

export default {
    createUser,
    updateUser,
    deleteUser,
    getUserById,
    getAllUser
}