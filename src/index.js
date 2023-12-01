import { app } from "./app/web.js"
import { logger } from "./app/logging.js"
import dotenv from "dotenv"

dotenv.config({ path: './config/.env' })

app.listen(process.env.PORT, () => {
    // console.log('listening on port 3000')
    logger.info(`App start on port ${process.env.PORT}`)
})