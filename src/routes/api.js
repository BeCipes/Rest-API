import express from "express"
import { PrismaClient } from "@prisma/client"
import roleController from "../controller/role-controller.js"
import { adminMiddleware } from "../middleware/admin-middleware.js"

const roleRouter = new express.Router()
roleRouter.use(adminMiddleware)

roleRouter.post("/api/role", roleController.createRole)

export {
    roleRouter
}