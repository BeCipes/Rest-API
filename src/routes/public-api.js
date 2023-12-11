import express from "express"
import authController from "../controller/auth-controller.js"
import favoriteController from "../controller/favorite-controller.js"
import { refreshTokenMiddleware, authMiddleware } from "../middleware/auth-middleware.js"

const publicRouter = new express.Router()

// Auth routes
publicRouter.post('/auth/register', authController.register)
publicRouter.post('/auth/login', authController.login)
publicRouter.post('/auth/verify-email', authController.sendVerifyEmail)
publicRouter.get('/auth/verify-email/:token', authController.verifyEmail)
publicRouter.post('/auth/forgot-password', authController.sendPasswordResetEmail)
publicRouter.post('/auth/forgot-password/:token', authController.forgotPassword)
publicRouter.get('/auth/refresh', refreshTokenMiddleware, authController.refreshTokens)

// Favorite routes
publicRouter.get("/favorite", authMiddleware, favoriteController.getFavoriteByIdUser)
publicRouter.post("/favorite", authMiddleware, favoriteController.createFavorite)
publicRouter.delete("/favorite/:favoriteId", authMiddleware, favoriteController.deleteFavorite)

// User routes
publicRouter.get("/user/get-info", authMiddleware, authController.getCurrentUser)

export {
    publicRouter
}