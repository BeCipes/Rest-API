import express from "express"
import authController from "../controller/auth-controller.js"
import favoriteController from "../controller/favorite-controller.js"
import { forgotPasswordMiddleware, authMiddleware } from "../middleware/auth-middleware.js"

const publicRouter = new express.Router()

// Auth routes
publicRouter.post('/auth/register', authController.register)
publicRouter.post('/auth/login', authController.login)
publicRouter.post('/auth/forgot-password', authController.sendPasswordResetEmail)
publicRouter.post('/auth/forgot-password/:token', authController.forgotPassword)
publicRouter.get('/auth/refresh', forgotPasswordMiddleware, authController.refreshTokens)

// Favorite routes
publicRouter.get("/favorite", authMiddleware, favoriteController.getFavoriteByIdUser)
publicRouter.post("/favorite", authMiddleware, favoriteController.createFavorite)
publicRouter.delete("/favorite/:favoriteId", authMiddleware, favoriteController.deleteFavorite)

export {
    publicRouter
}