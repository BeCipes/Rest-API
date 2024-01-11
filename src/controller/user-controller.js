import userService from "../service/user-service.js"
import { SuccessWebResponse } from "../helper/web-response.js"
import { getImageLink } from "../helper/image-helper.js"

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
        req.body.id = userId
        
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
        result.photo = await getImageLink(result.photo)

        const response = SuccessWebResponse(200, "OK", "Success get user", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const getAllUser = async (req, res, next) => {
    try {
        const result = await userService.getAll()

        await Promise.all(result.map(async (item) => {
            item.photo = await getImageLink(item.photo)

            return item
        }))

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