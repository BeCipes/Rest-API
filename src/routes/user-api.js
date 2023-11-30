import express from "express"
import userController from "../controller/user-controller.js"
import { adminMiddleware } from "../middleware/admin-middleware.js"

const userRouter = new express.Router()
userRouter.use(adminMiddleware)

// User Router
userRouter.get("/api/user/", userController.getAllUser)
userRouter.get("/api/user/:userId", userController.getUserById)
userRouter.post("/api/user", userController.createUser)
userRouter.put("/api/user/:userId", userController.updateUser)
userRouter.delete("/api/user/:userId", userController.deleteUser)

export {
    userRouter
}