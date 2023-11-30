import express from "express"
import { publicRouter } from "./../routes/public-api.js"
import { roleRouter } from "./../routes/role-api.js"
import { userRouter } from "./../routes/user-api.js"
import { errorMiddleware } from "./../middleware/error-middleware.js"

const app = express()

app.use(express.json())

const apiPrefix = "/api"

app.use(apiPrefix, publicRouter)
app.use(apiPrefix, roleRouter)
app.use(apiPrefix, userRouter)

app.use(errorMiddleware)

export { app }