import { validate } from "../validation/validation.js"
import { createUserValidation, updateUserValidation, getUserValidation } from "../validation/user-validation.js"
import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import bcrypt from "bcrypt"

const create = async (req) => {
    const user = validate(createUserValidation, req)

    const countUser = await prismaClient.user.count({
        where: {
            email: user.email
        }
    })

    if (countUser === 1) {
        throw new ResponseError(400, "Email already exists")
    }

    const userRole = await prismaClient.role.findFirst({
        where: {
            role_name: "User".toLowerCase(),
        },
        select: {
            id_role: true
        }
    })

    if (!userRole) {
        throw new ResponseError(500, "Role not found")
    }

    user.id_role = userRole.id_role
    user.password = await bcrypt.hash(user.password, 10)

    return prismaClient.user.create({
        data: user,
        select: {
            first_name: true,
            last_name: true,
            email: true
        }
    })
}

const update = async (req) => {
    const user = validate(updateUserValidation, req)

    const countUser = await prismaClient.user.count({
        where: {
            id_user: user.id_user
        }
    })

    if (!countUser) {
        throw new ResponseError(400, "User is not found")
    }

    user.password = await bcrypt.hash(user.password, 10)

    return prismaClient.user.update({
        where: {
            id_user: user.id_user
        },
        data: user,
        select: {
            id_user: true,
            first_name: true,
            last_name: true,
            email: true
        }
    })
}

const remove = async (userId) => {
    userId = validate(getUserValidation, userId)

    const countUser = await prismaClient.user.count({
        where: {
            id_user: userId
        }
    })

    if (!countUser) {
        throw new ResponseError(400, "User is not found")
    }

    await prismaClient.user.delete({
        where: {
            id_user: userId
        },
    })

    return
}

const get = async (userId) => {
    userId = validate(getUserValidation, userId)

    const user = await prismaClient.user.findUnique({
        where: {
            id_user: userId
        },
        select: {
            id_user: true,
            first_name: true,
            last_name: true,
            email: true
        }
    })

    if (!user) {
        throw new ResponseError(400, "User is not found")
    }

    return user
}

const getAll = async () => {
    const user = await prismaClient.user.findMany({
        select: {
            id_user: true,
            first_name: true,
            last_name: true,
            email: true
        }
    })

    if (!user) {
        throw new ResponseError(400, "User is not found")
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