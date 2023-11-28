import { validate } from "../validation/validation.js"
import { registerUserValidation, loginUserValidation } from "../validation/auth-validation.js"
import { prismaClient } from "../application/database.js"
import { ResponseError } from "../error/response-error.js"
import bcrypt from "bcrypt"
import {generateTokens, generateAccessToken, generateRefreshToken} from "../helper/generate-jwt.js"

const register = async (req) => {
    const user = validate(registerUserValidation, req)

    const countUser = await prismaClient.user.count({
        where: {
            email: user.email
        }
    });

    if (countUser === 1) {
        throw new ResponseError(400, "Email already exists")
    }

    const userRole = await prismaClient.role.findFirst({
        where: {
            role_name: "User".toLowerCase(),
        },
    })

    if (!userRole) {
        throw new ResponseError(500, "Role not found");
    }

    user.id_role = userRole.id_role;
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
        throw new ResponseError(400, "Email or password is wrong")
    }
    
    const isPasswordValid = await bcrypt.compare(user.password, dbUser.password)
    
    if (!isPasswordValid) {
        throw new ResponseError(400, "Email or password is wrong")
    }

    const { accessToken, refreshToken } = generateTokens(user);

    return prismaClient.user.update({
        where: {
            email: dbUser.email
        },
        data: {
            token: refreshToken
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
}

export default {
    register,
    login
}