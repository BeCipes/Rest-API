import express from "express"
import bahanController from "../controller/bahan-controller.js"
import { adminMiddleware } from "../middleware/admin-middleware.js"

const bahanRouter = new express.Router()
bahanRouter.use(adminMiddleware)

// Bahan Router
bahanRouter.get("/bahan/", bahanController.getAllBahan)
bahanRouter.get("/bahan/:bahanId", bahanController.getBahanById)
bahanRouter.post("/bahan", bahanController.createBahan)
bahanRouter.put("/bahan/:bahanId", bahanController.updateBahan)
bahanRouter.delete("/bahan/:bahanId", bahanController.deleteBahan)

export {
    bahanRouter
}