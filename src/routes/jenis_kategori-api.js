import express from "express"
import jenisKategoriController from "../controller/jenis_kategori-controller.js"
import { adminMiddleware } from "../middleware/admin-middleware.js"

const jenisKategoriRouter = new express.Router()
jenisKategoriRouter.use(adminMiddleware)

// Kategori Resep Router
jenisKategoriRouter.get("/jenis-kategori/", jenisKategoriController.getAllJenisKategori)
jenisKategoriRouter.get("/jenis-kategori/:jenisKategoriId", jenisKategoriController.getJenisKategoriById)
jenisKategoriRouter.post("/jenis-kategori", jenisKategoriController.createJenisKategori)
jenisKategoriRouter.put("/jenis-kategori/:jenisKategoriId", jenisKategoriController.updateJenisKategori)
jenisKategoriRouter.delete("/jenis-kategori/:jenisKategoriId", jenisKategoriController.deleteJenisKategori)

export {
    jenisKategoriRouter
}