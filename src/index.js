import { app } from "./application/web.js"
import { logger } from "./application/logging.js"

app.listen(process.env.PORT, () => {
    // console.log('listening on port 3000')
    logger.info(`App start on port ${process.env.PORT}`)
})