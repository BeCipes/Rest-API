import express from "express"
import artikelController from "../controller/artikel-controller.js"
import { adminMiddleware } from "../middleware/admin-middleware.js"

const artikelRouter = new express.Router()
artikelRouter.use(adminMiddleware)

// Artikel Router
artikelRouter.get("/artikel/", artikelController.getAllArtikel)
artikelRouter.get("/artikel/:artikelId", artikelController.getArtikelById)
artikelRouter.post("/artikel", artikelController.createArtikel)
artikelRouter.put("/artikel/:artikelId", artikelController.updateArtikel)
artikelRouter.delete("/artikel/:artikelId", artikelController.deleteArtikel)

export {
    artikelRouter
}