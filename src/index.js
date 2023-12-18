import { app } from "./app/web.js"
import { logger } from "./app/logging.js"

const PORT = process.env.PORT || 3000

app.listen(PORT, '0.0.0.0', () => {
    logger.info(`App start on port ${PORT}`)
})