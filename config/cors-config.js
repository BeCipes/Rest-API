const PORT = process.env.PORT || 3000
const PORT_ADIT = 5173

const corsOptions = {
    // origin: function (origin, callback) {
    //     const allowedOrigins = ['http://localhost:' + PORT, 'http://localhost:' + PORT_ADIT]
    //     const isAllowed = allowedOrigins.includes(origin)
    //     callback(null, isAllowed)
    // },
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}

export { corsOptions }