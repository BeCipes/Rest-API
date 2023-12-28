import { app, apiPrefix } from '../../config/app-config.js'
import { publicRouter } from "../routes/public-api.js"
import { roleRouter } from "../routes/role-api.js"
import { userRouter } from "../routes/user-api.js"
import { kategoriRouter } from "../routes/kategori-api.js"
import { jenisKategoriRouter } from "../routes/jenis_kategori-api.js"
import { kategoriResepRouter } from "../routes/kategori_resep-api.js"
import { artikelRouter } from "../routes/artikel-api.js"
import { teknikRouter } from "../routes/teknik-api.js"
import { stepRouter } from "../routes/step-api.js"
import { resepRouter } from "../routes/resep-api.js"
import { bahanRouter } from "../routes/bahan-api.js"
import { errorMiddleware } from "../middleware/error-middleware.js"
import { notFoundMiddleware } from "../middleware/not-found-middleware.js"

// Public routes API (user & admin)
app.use(apiPrefix, publicRouter)

// Admin routes API (admin only)
app.use(apiPrefix, userRouter)
app.use(apiPrefix, roleRouter)
app.use(apiPrefix, kategoriRouter)
app.use(apiPrefix, jenisKategoriRouter)
app.use(apiPrefix, kategoriResepRouter)
app.use(apiPrefix, artikelRouter)
app.use(apiPrefix, teknikRouter)
app.use(apiPrefix, stepRouter)
app.use(apiPrefix, resepRouter)
app.use(apiPrefix, bahanRouter)

// Middleware
app.use(errorMiddleware)

export { app }