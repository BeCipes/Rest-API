import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import { validate } from "../validation/validation.js"
import { createRoleValidation, updateRoleValidation, getRoleValidation } from "../validation/role-validation.js"

const create = async (req, res) => {
    const role = validate(createRoleValidation, req)

    const countRole = await prismaClient.role.count({
        where: {
            role_name: role.role_name
        }
    })

    if (countRole === 1) {
        throw new ResponseError(400, "Role already exists")
    }

    return prismaClient.role.create({
        data: role,
        select: {
            role_name: true
        }
    })
}

const update = async (req, res) => {
    const role = validate(updateRoleValidation, req)

    const countRole = await prismaClient.role.count({
        where: {
            id_role: role.id_role
        }
    })

    if (!countRole) {
        throw new ResponseError(400, "Role is not found")
    }

    return prismaClient.role.update({
        where: {
            id_role: role.id_role
        },
        data: role,
        select: {
            id_role: true,
            role_name: true
        }
    })
}

const get = async (roleId, res) => {
    roleId = validate(getRoleValidation, roleId)

    const role = await prismaClient.role.findUnique({
        where: {
            id_role: roleId
        },
        select: {
            id_role: true,
            role_name: true
        }
    })

    if (!role) {
        throw new ResponseError(400, "Role is not found")
    }

    return role
}

const getAll = async (res) => {
    const role = await prismaClient.role.findMany({
        select: {
            id_role: true,
            role_name: true
        }
    })

    if (!role) {
        throw new ResponseError(400, "Role is not found")
    }

    return role
}

const remove = async (roleId, res) => {
    roleId = validate(getRoleValidation, roleId)

    const role = await prismaClient.role.count({
        where: {
            id_role: roleId
        }
    })

    if (!role) {
        throw new ResponseError(400, "Role is not found")
    }

    await prismaClient.role.delete({
        where: {
            id_role: roleId
        }
    })

    return
}

export default {
    create,
    update,
    get,
    getAll,
    remove
}