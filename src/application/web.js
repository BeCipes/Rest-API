import express from "express"
import { publicRouter } from "./../routes/public-api.js"
import { roleRouter } from "./../routes/role-api.js"
import { userRouter } from "./../routes/user-api.js"
import { errorMiddleware } from "./../middleware/error-middleware.js"

export const app = express()

app.use(express.json())

app.use(publicRouter)
app.use(roleRouter)
app.use(userRouter)

app.use(errorMiddleware)