import { validate } from "../validation/validation.js"
import { createUserValidation, updateUserValidation, getUserValidation } from "../validation/user-validation.js"
import { prismaClient } from "../app/database.js"
import { ResponseError } from "../error/response-error.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from "uuid"

const create = async (req) => {
    const user = validate(createUserValidation, req)

    const countUser = await prismaClient.user.count({
        where: {
            email: user.email
        }
    })

    // Perdebatan apakah admin hanya boleh membuat user / boleh semua
    if (countUser === 1) {
        throw new ResponseError(400, "Email already exists")
    }

    const userRole = await prismaClient.role.findFirst({
        where: {
            role_name: "User".toLowerCase(),
        },
        select: {
            id: true
        }
    })

    if (!userRole) {
        throw new ResponseError(404, "Role not found")
    }

    user.id_role = userRole.id
    user.password = await bcrypt.hash(user.password, 10)
    user.id = uuid().toString()

    await prismaClient.user.create({
        data: user,
        select: {
            first_name: true,
            last_name: true,
            email: true
        }
    })

    return
}

const update = async (req) => {
    const user = validate(updateUserValidation, req)

    const countUser = await prismaClient.user.count({
        where: {
            id: user.id
        }
    })

    if (!countUser) {
        throw new ResponseError(404, "User is not found")
    }

    user.password = await bcrypt.hash(user.password, 10)

    await prismaClient.user.update({
        where: {
            id: user.id
        },
        data: user,
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true
        }
    })

    return 
}

const remove = async (userId) => {
    userId = validate(getUserValidation, userId)

    const countUser = await prismaClient.user.count({
        where: {
            id: userId
        }
    })

    if (!countUser) {
        throw new ResponseError(404, "User is not found")
    }

    await prismaClient.user.delete({
        where: {
            id: userId
        },
    })

    return
}

const get = async (userId) => {
    userId = validate(getUserValidation, userId)

    const user = await prismaClient.user.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            role: {
                select: {
                    role_name: true,
                },
            },
        }
    })

    if (!user) {
        throw new ResponseError(404, "User is not found")
    }

    return user
}

const getAll = async () => {
    const user = await prismaClient.user.findMany({
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true,
            role: {
                select: {
                    role_name: true,
                },
            },
        }
    })

    if (!user) {
        throw new ResponseError(404, "User is not found")
    }

    return user
}

export default {
    create,
    update,
    remove,
    get,
    getAll
}