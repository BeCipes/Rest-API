import express from "express"
import favoriteController from "../controller/favorite-controller.js"
import { adminMiddleware } from "../middleware/admin-middleware.js"

const favoriteRouter = new express.Router()
favoriteRouter.use(adminMiddleware)

// Favorite Router
favoriteRouter.get("/favorite/", favoriteController.getAllFavorite)
favoriteRouter.get("/favorite/:favoriteId", favoriteController.getFavoriteById)
favoriteRouter.post("/favorite", favoriteController.createFavorite)
favoriteRouter.put("/favorite/:favoriteId", favoriteController.updateFavorite)
favoriteRouter.delete("/favorite/:favoriteId", favoriteController.deleteFavorite)

export {
    favoriteRouter
}