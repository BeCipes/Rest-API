import express from "express"
import teknikController from "../controller/teknik-controller.js"
import { adminMiddleware } from "../middleware/admin-middleware.js"

const teknikRouter = new express.Router()
teknikRouter.use(adminMiddleware)

// Teknik Router
teknikRouter.get("/teknik/", teknikController.getAllTeknik)
teknikRouter.get("/teknik/:teknikId", teknikController.getTeknikById)
teknikRouter.post("/teknik", teknikController.createTeknik)
teknikRouter.put("/teknik/:teknikId", teknikController.updateTeknik)
teknikRouter.delete("/teknik/:teknikId", teknikController.deleteTeknik)

export {
    teknikRouter
}