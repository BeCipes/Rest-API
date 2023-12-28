import express from "express"
import authController from "../controller/auth-controller.js"
import favoriteController from "../controller/favorite-controller.js"
import artikelController from "../controller/artikel-controller.js"
import bahanController from "../controller/bahan-controller.js"
import jenisKategoriController from "../controller/jenis_kategori-controller.js"
import kategoriResepController from "../controller/kategori_resep-controller.js"
import kategoriController from "../controller/kategori-controller.js"
import resepController from "../controller/resep-controller.js"
import stepController from "../controller/step-controller.js"
import teknikController from "../controller/teknik-controller.js"
import uploadController from "../controller/upload-controller.js"
import { refreshTokenMiddleware, authMiddleware, uploadMiddleware } from "../middleware/public-middleware.js"

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
publicRouter.get("/user/get-info", authMiddleware, authController.getCurrentUserInfo)

// Data routes
publicRouter.get("/data/artikel/", authMiddleware, artikelController.getAllArtikel)
publicRouter.get("/data/bahan/", authMiddleware, bahanController.getAllBahan)
publicRouter.get("/data/jenis-kategori/", authMiddleware, jenisKategoriController.getAllJenisKategori)
publicRouter.get("/data/kategori-resep/", authMiddleware, kategoriResepController.getAllKategoriResep)
publicRouter.get("/data/kategori/", authMiddleware, kategoriController.getAllKategori)
publicRouter.get("/data/resep/", authMiddleware, resepController.getAllResep)
publicRouter.get("/data/step/", authMiddleware, stepController.getAllStep)
publicRouter.get("/data/teknik/", authMiddleware, teknikController.getAllTeknik)

publicRouter.get("/data/artikel/:artikelId", authMiddleware, artikelController.getArtikelById)
publicRouter.get("/data/bahan/:bahanId", authMiddleware, bahanController.getBahanById)
publicRouter.get("/data/jenis-kategori/:jenisKategoriId", authMiddleware, jenisKategoriController.getJenisKategoriById)
publicRouter.get("/data/kategori-resep/:kategoriResepId", authMiddleware, kategoriResepController.getKategoriResepById)
publicRouter.get("/data/step/:stepId", authMiddleware, stepController.getStepById)
publicRouter.get("/data/kategori/:kategoriId", authMiddleware, kategoriController.getKategoriById)
publicRouter.get("/data/resep/:resepId", authMiddleware, resepController.getResepById)
publicRouter.get("/data/teknik/:teknikId", authMiddleware, teknikController.getTeknikById)

publicRouter.get("/data/kategori-resep/resep/:resepId", authMiddleware, kategoriResepController.getKategoriResepByIdResep)
publicRouter.get("/data/step/resep/:resepId", authMiddleware, stepController.getStepByIdResep)

publicRouter.post("/data/upload", uploadMiddleware, uploadController.uploadFile)

export {
    publicRouter
}