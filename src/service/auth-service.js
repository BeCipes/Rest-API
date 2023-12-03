import { validate } from "./../validation/validation.js"
import { registerUserValidation, loginUserValidation } from "./../validation/auth-validation.js"
import { prismaClient } from "../app/database.js"
import { ResponseError } from "./../error/response-error.js"
import { generateTokens, generateAccessToken } from "./../helper/generate-jwt.js"
import { generatePasswordToken } from "./../helper/mailer.js"
import bcrypt from "bcrypt"

const register = async (req) => {
    const user = validate(registerUserValidation, req)

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
        throw new ResponseError(404, "Role not found")
    }

    user.id_role = userRole.id_role
    user.password = await bcrypt.hash(user.password, 10)

    const token = await generateTokens(user)
    user.token = token.refreshToken

    await prismaClient.user.create({
        data: user,
        select: {
            first_name: true,
            last_name: true,
            email: true,
            token: true
        }
    })

    return {
        token
    }
}

const login = async (req) => {
    const user = validate(loginUserValidation, req)

    const dbUser = await prismaClient.user.findUnique({
        where: {
            email: user.email
        },
        include: {
            role: {
                select: {
                    role_name: true,
                },
            },
        }
    })
    
    if (!dbUser) {
        throw new ResponseError(401, "Email or password is wrong")
    }
    
    const isPasswordValid = await bcrypt.compare(user.password, dbUser.password)
    
    if (!isPasswordValid) {
        throw new ResponseError(401, "Email or password is wrong")
    }

    
    const token = await generateTokens(dbUser)

    const tes = await prismaClient.user.update({
        where: {
            email: dbUser.email
        },
        data: {
            token: token.refreshToken
        },
        select: {
            role: {
                select: {
                    role_name: true
                }
            },
            token: true
        }
    })

    if (!tes) {
        throw new ResponseError(500, "Internal Server Error")
    }

    return {
        role: dbUser.role?.role_name,
        token
    }
}

const refreshToken = async (refreshToken) => {
    const user = await prismaClient.user.findFirst({
        where: {
            token: refreshToken,
        },
        include: {
            role: {
                select: {
                    role_name: true,
                },
            },
        },
    })
    
    if (!user) {
        throw new ResponseError(401, "Invalid refresh token")
    }
    
    const newToken = await generateAccessToken(user)

    return {
        role: user.role?.role_name,
        token: newToken,
    }
}

const generatePasswordResetToken = async (email) => {
    const user = await prismaClient.user.findUnique({
        where: {
            email: email
        }
    })

    if (!user) {
        throw new ResponseError(404, "User not found")
    }

    const token = generatePasswordToken();

    await prismaClient.user.update({
        where: {
            email: email
        },
        data: {
            resetToken: token.resetToken,
            resetTokenExpiry: token.resetTokenExpiry,
        },
    })

    return token
}

export default {
    register,
    login,
    refreshToken,
    generatePasswordResetToken
}