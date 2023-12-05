import express from "express"
import kategoriController from "../controller/kategori-controller.js"
import { adminMiddleware } from "../middleware/admin-middleware.js"

const kategoriRouter = new express.Router()
kategoriRouter.use(adminMiddleware)

// Kategori Resep Router
kategoriRouter.get("/kategori/", kategoriController.getAllKategori)
kategoriRouter.get("/kategori/:kategoriId", kategoriController.getKategoriById)
kategoriRouter.post("/kategori", kategoriController.createKategori)
kategoriRouter.put("/kategori/:kategoriId", kategoriController.updateKategori)
kategoriRouter.delete("/kategori/:kategoriId", kategoriController.deleteKategori)

export {
    kategoriRouter
}