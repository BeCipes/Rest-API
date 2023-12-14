import { validate } from "./../validation/validation.js"
import { registerUserValidation, loginUserValidation, forgotPasswordValidation } from "./../validation/auth-validation.js"
import { prismaClient } from "../app/database.js"
import { ResponseError } from "./../error/response-error.js"
import { generateTokens, generateAccessToken, generateResetPasswordToken, generateVerifyEmailToken, decodeToken, getTokenPart, convertExpToDate } from "../helper/jwt-helper.js"
import { sendForgotPass, sendVerifyEmail } from "../helper/send-mail.js"
import bcrypt from "bcrypt"
import { v4 as uuid } from 'uuid'

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
            id: true
        }
    })

    if (!userRole) {
        throw new ResponseError(404, "Role not found")
    }

    user.id = uuid().toString()
    user.id_role = userRole.id
    user.password = await bcrypt.hash(user.password, 10)

    const token = await generateTokens(user)
    const decodedRefreshToken = await decodeToken(token.refreshToken)
    const expDate = await convertExpToDate(decodedRefreshToken.exp)

    token.refreshToken = await bcrypt.hash(token.refreshToken, 10)

    user.token = token.refreshToken
    user.token_exp = expDate

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
    const decodedRefreshToken = await decodeToken(token.refreshToken)
    const expDate = await convertExpToDate(decodedRefreshToken.exp)
    
    token.refreshToken = await bcrypt.hash(token.refreshToken, 10)

    const tes = await prismaClient.user.update({
        where: {
            email: dbUser.email
        },
        data: {
            token: token.refreshToken,
            token_exp: expDate
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

const refreshToken = async (rawToken) => {
    const refreshToken = await getTokenPart(rawToken)

    const user = await prismaClient.user.findFirst({
        where: {
            token: refreshToken,
        },
        select: {
            token_exp: true,
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

    const tokenExp = new Date(user.token_exp).getTime()

    if (tokenExp && tokenExp < Date.now()) {
        throw new ResponseError(401, "Refresh token has expired, please login again")
    }
    
    const newToken = await generateAccessToken(user)

    return {
        role: user.role?.role_name,
        token: newToken,
    }
}

const sendPasswordResetMail = async (email) => {
    const user = await prismaClient.user.findUnique({
        where: {
            email: email
        }
    })

    if (!user) {
        throw new ResponseError(404, "User not found")
    }

// const isVerified = await prismaClient.user.count({
//         where: {
//             email: user.email,
//             isVerified: true
//         }
//     })

//     if (isVerified === 1) {
//         throw new ResponseError(400, "This account is not verified")
//     }

    const token = await generateResetPasswordToken(user)
    await sendForgotPass(token, email)

    return
}

const forgotPassword = async (token, password) => {
    password = validate(forgotPasswordValidation, password)
    const decodedToken = await decodeToken(token)

    const user = await prismaClient.user.findFirst({
        where: {
            id: decodedToken.id,
        },
    })
    
    if (!user) {
        throw new ResponseError(401, "Invalid token")
    }
    
    const newPassword = await bcrypt.hash(password, 10)
    
    await prismaClient.user.update({
        where: {
            id: user.id,
        },
        data: {
            password: newPassword
        },
    })

    return
}

const sendVerifyEmailMail = async (email) => {
    const user = await prismaClient.user.findUnique({
        where: {
            email: email
        }
    })

    if (!user) {
        throw new ResponseError(404, "User not found")
    }

    const token = await generateVerifyEmailToken(user)
    await sendVerifyEmail(token, email)

    await prismaClient.user.update({
        where: {
            id: user.id,
        },
        data: {
            verify_token: token
        },
    })

    return
}

const verifyEmail = async (token) => {
    const decodedToken = await decodeToken(token)

    const user = await prismaClient.user.findUnique({
        where: {
            email: decodedToken.email,
            verify_token: token
        }
    })

    if (!user) {
        throw new ResponseError(404, "User not found")
    }


    await prismaClient.user.update({
        where: {
            id: user.id,
        },
        data: {
            isVerified: true,
            verify_token: null
        },
    })

    return
}

const getUserInfo = async (token) => {
    token = await getTokenPart(token)
    const decodedToken = await decodeToken(token)

    const user = await prismaClient.user.findUnique({
        where: {
            id: decodedToken.id,
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
        throw new ResponseError(401, "Invalid token")
    }

    return {
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        photo: user.photo,
        role: user.role?.role_name,
        isVerified: user.isVerified
    }
}

export default {
    register,
    login,
    refreshToken,
    forgotPassword,
    sendPasswordResetMail,
    sendVerifyEmailMail,
    getUserInfo,
    verifyEmail
}