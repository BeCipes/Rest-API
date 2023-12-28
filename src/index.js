import { app } from "./app/web.js"
// import { logger } from "./app/logging.js"

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    // logger.info(`App start on port ${PORT}`)
    console.log(`App started on port ${PORT}`)
})