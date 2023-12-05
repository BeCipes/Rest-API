import express from "express"
import stepController from "../controller/step-controller.js"
import { adminMiddleware } from "../middleware/admin-middleware.js"

const stepRouter = new express.Router()
stepRouter.use(adminMiddleware)

// Step Router
stepRouter.get("/step/", stepController.getAllStep)
stepRouter.get("/step/:stepId", stepController.getStepById)
stepRouter.get("/step/resep/:resepId", stepController.getStepByIdResep)
stepRouter.post("/step", stepController.createStep)
stepRouter.put("/step/:stepId", stepController.updateStep)
stepRouter.put("/step/:stepId/:resepId", stepController.updateStep)
stepRouter.delete("/step/:stepId", stepController.deleteStep)

export {
    stepRouter
}