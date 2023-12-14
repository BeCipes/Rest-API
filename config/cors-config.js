const PORT = process.env.PORT || 3000

const corsOptions = {
    origin: 'http://localhost:' + PORT,
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}

export { corsOptions }