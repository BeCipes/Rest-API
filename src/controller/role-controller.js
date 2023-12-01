import roleService from "../service/role-service.js"
import { SuccessWebResponse } from "../helper/web-response.js"

const createRole = async (req, res, next) => {
    try {
        const result = await roleService.create(req.body)
        const response = SuccessWebResponse(200, "OK", "Success create new role", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const updateRole = async (req, res, next) => {
    try {
        const roleId = req.params.roleId
        req.body.id_role = roleId
        
        const result = await roleService.update(req.body)
        const response = SuccessWebResponse(200, "OK", "Success update role", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const deleteRole = async (req, res, next) => {
    try {
        const roleId = req.params.roleId
        const result = await roleService.remove(roleId)
        const response = SuccessWebResponse(200, "OK", "Success delete role", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const getRoleById = async (req, res, next) => {
    try {
        const roleId = req.params.roleId
        const result = await roleService.get(roleId)
        const response = SuccessWebResponse(200, "OK", "Success get role", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

const getAllRole = async (req, res, next) => {
    try {
        const result = await roleService.getAll()
        const response = SuccessWebResponse(200, "OK", "Success get all role", result)

        res.status(200).json(response)
    } catch (e) {
        next(e)
    }
}

export default {
    createRole,
    updateRole,
    deleteRole,
    getRoleById,
    getAllRole
}