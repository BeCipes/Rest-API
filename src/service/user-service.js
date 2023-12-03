import { validate } from "../validation/validation.js"
import { createUserValidation, updateUserValidation, getUserValidation } from "../validation/user-validation.js"
import { prismaClient } from "../app/database.js"
import { ResponseError } from "../error/response-error.js"
import bcrypt from "bcrypt"

const create = async (req) => {
    const user = validate(createUserValidation, req)

    const countUser = await prismaClient.users.count({
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
        throw new ResponseError(404, "Role not found")
    }

    user.id_role = userRole.id_role
    user.password = await bcrypt.hash(user.password, 10)

    return prismaClient.users.create({
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

    const countUser = await prismaClient.users.count({
        where: {
            id: user.id
        }
    })

    if (!countUser) {
        throw new ResponseError(404, "User is not found")
    }

    user.password = await bcrypt.hash(user.password, 10)

    return prismaClient.users.update({
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
}

const remove = async (userId) => {
    userId = validate(getUserValidation, userId)

    const countUser = await prismaClient.users.count({
        where: {
            id: userId
        }
    })

    if (!countUser) {
        throw new ResponseError(404, "User is not found")
    }

    await prismaClient.users.delete({
        where: {
            id: userId
        },
    })

    return
}

const get = async (userId) => {
    userId = validate(getUserValidation, userId)

    const user = await prismaClient.users.findUnique({
        where: {
            id: userId
        },
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true
        }
    })

    if (!user) {
        throw new ResponseError(404, "User is not found")
    }

    return user
}

const getAll = async () => {
    const user = await prismaClient.users.findMany({
        select: {
            id: true,
            first_name: true,
            last_name: true,
            email: true
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