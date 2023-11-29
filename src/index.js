import express from "express"
import { publicRouter } from "./routes/public-api.js"
import { roleRouter } from "./routes/role-api.js"
import { errorMiddleware } from "./middleware/error-middleware.js"

export const app = express()

app.use(express.json())
app.use(errorMiddleware)
app.use(publicRouter)
app.use(roleRouter)

app.listen(process.env.PORT, () => {
    console.log('listening on port 3000')
    // logger.info("App start");
})