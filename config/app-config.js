import express from "express"
import cors from "cors"
import { corsOptions } from "./cors-config.js"

const app = express()
const apiPrefix = "/api"

app.use(cors(corsOptions))

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

export { app, apiPrefix }