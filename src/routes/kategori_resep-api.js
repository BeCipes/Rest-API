import express from "express"
import kategoriResepController from "../controller/kategori_resep-controller.js"
import { adminMiddleware } from "../middleware/admin-middleware.js"

const kategoriResepRouter = new express.Router()
kategoriResepRouter.use(adminMiddleware)

// Kategori Resep Router
kategoriResepRouter.get("/kategori-resep/", kategoriResepController.getAllKategoriResep)
kategoriResepRouter.get("/kategori-resep/:kategoriResepId", kategoriResepController.getKategoriResepById)
kategoriResepRouter.post("/kategori-resep", kategoriResepController.createKategoriResep)
kategoriResepRouter.put("/kategori-resep/:kategoriResepId", kategoriResepController.updateKategoriResep)
kategoriResepRouter.delete("/kategori-resep/:kategoriResepId", kategoriResepController.deleteKategoriResep)

export {
    kategoriResepRouter
}