import express from "express"
import roleController from "../controller/role-controller.js"
import { adminMiddleware } from "../middleware/admin-middleware.js"

const roleRouter = new express.Router()
roleRouter.use(adminMiddleware)

// Role Router
roleRouter.get("/api/role/", roleController.getAllRole)
roleRouter.get("/api/role/:roleId", roleController.getRoleById)
roleRouter.post("/api/role", roleController.createRole)
roleRouter.put("/api/role/:roleId", roleController.updateRole)
roleRouter.delete("/api/role/:roleId", roleController.deleteRole)

export {
    roleRouter
}