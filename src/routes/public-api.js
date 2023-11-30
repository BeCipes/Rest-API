import express from "express"
import authController from "../controller/auth-controller.js"
import { authMiddleware } from "../middleware/auth-middleware.js"

const publicRouter = new express.Router()
// publicRouter.use(authMiddleware)

publicRouter.post('/users/register', authController.register)
publicRouter.post('/users/login', authController.login)
publicRouter.post('/users/refresh', authMiddleware, authController.refreshTokens)

export {
    publicRouter
}