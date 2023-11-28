import express from "express"
import authController from "../controller/auth-controller.js"

const publicRouter = new express.Router()

publicRouter.post('/api/users/register', authController.register)
publicRouter.post('/api/users/login', authController.login)

export {
    publicRouter
}