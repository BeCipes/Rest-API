import express from "express"
import teknikController from "../controller/teknik-controller.js"
import { adminMiddleware } from "../middleware/admin-middleware.js"

const teknikRouter = new express.Router()
teknikRouter.use(adminMiddleware)

// Teknik Router
teknikRouter.get("/teknik/", teknikController.Teknik)
teknikRouter.get("/teknik/:teknikId", teknikController.TeknikById)
teknikRouter.post("/teknik", teknikController.Teknik)
teknikRouter.put("/teknik/:teknikId", teknikController.Teknik)
teknikRouter.delete("/teknik/:teknikId", teknikController.Teknik)

export {
    teknikRouter
}