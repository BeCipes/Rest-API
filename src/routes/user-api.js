import express from "express"
import userController from "../controller/user-controller.js"
import { adminMiddleware } from "../middleware/admin-middleware.js"

const userRouter = new express.Router()
userRouter.use(adminMiddleware)

// User Router
userRouter.get("/user/", userController.getAllUser)
userRouter.get("/user/:userId", userController.getUserById)
userRouter.post("/user", userController.createUser)
userRouter.put("/user/:userId", userController.updateUser)
userRouter.delete("/user/:userId", userController.deleteUser)

export {
    userRouter
}