import { prismaClient } from "../app/database.js"
import { ResponseError } from "../error/response-error.js"
import { validate } from "../validation/validation.js"
import { createRoleValidation, updateRoleValidation, getRoleValidation } from "../validation/role-validation.js"

const create = async (req) => {
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

const update = async (req) => {
    const role = validate(updateRoleValidation, req)

    const countRole = await prismaClient.role.count({
        where: {
            id: role.id
        }
    })

    if (!countRole) {
        throw new ResponseError(404, "Role is not found")
    }

    return prismaClient.role.update({
        where: {
            id: role.id
        },
        data: role,
        select: {
            id: true,
            role_name: true
        }
    })
}

const get = async (roleId) => {
    roleId = validate(getRoleValidation, roleId)

    const role = await prismaClient.role.findUnique({
        where: {
            id: roleId
        },
        select: {
            id: true,
            role_name: true
        }
    })

    if (!role) {
        throw new ResponseError(404, "Role is not found")
    }

    return role
}

const getAll = async () => {
    const role = await prismaClient.role.findMany({
        select: {
            id: true,
            role_name: true
        }
    })

    if (!role) {
        throw new ResponseError(404, "Role is not found")
    }

    return role
}

const remove = async (roleId) => {
    roleId = validate(getRoleValidation, roleId)

    const role = await prismaClient.role.count({
        where: {
            id: roleId
        }
    })

    if (!role) {
        throw new ResponseError(404, "Role is not found")
    }

    await prismaClient.role.delete({
        where: {
            id: roleId
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