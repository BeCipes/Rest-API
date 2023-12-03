import express from "express"
import authController from "../controller/auth-controller.js"
import { authMiddleware } from "../middleware/auth-middleware.js"

const publicRouter = new express.Router()
// publicRouter.use(authMiddleware)

publicRouter.post('/auth/register', authController.register)
publicRouter.post('/auth/login', authController.login)
publicRouter.post('/auth/forgot-password', authController.sendPasswordResetEmail)
publicRouter.post('/auth/forgot-password/:token', authController.forgotPassword)
publicRouter.post('/auth/refresh', authMiddleware, authController.refreshTokens)

export {
    publicRouter
}