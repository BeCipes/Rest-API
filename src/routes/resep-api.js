import express from "express"
import resepController from "../controller/resep-controller.js"
import { adminMiddleware } from "../middleware/admin-middleware.js"

const resepRouter = new express.Router()
resepRouter.use(adminMiddleware)

// Resep Router
resepRouter.get("/resep/", resepController.getAllResep)
resepRouter.get("/resep/:resepId", resepController.getResepById)
resepRouter.post("/resep", resepController.createResep)
resepRouter.put("/resep/:resepId", resepController.updateResep)
resepRouter.delete("/resep/:resepId", resepController.deleteResep)

export {
    resepRouter
}