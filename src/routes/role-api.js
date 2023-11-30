import express from "express"
import roleController from "../controller/role-controller.js"
import { adminMiddleware } from "../middleware/admin-middleware.js"

const roleRouter = new express.Router()
roleRouter.use(adminMiddleware)

// Role Router
roleRouter.get("/role/", roleController.getAllRole)
roleRouter.get("/role/:roleId", roleController.getRoleById)
roleRouter.post("/role", roleController.createRole)
roleRouter.put("/role/:roleId", roleController.updateRole)
roleRouter.delete("/role/:roleId", roleController.deleteRole)

export {
    roleRouter
}