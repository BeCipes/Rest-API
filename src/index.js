import { app } from "./app/web.js"
import { logger } from "./app/logging.js"

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    // console.log('listening on port 3000')
    logger.info(`App start on port ${process.env.PORT}`)
})