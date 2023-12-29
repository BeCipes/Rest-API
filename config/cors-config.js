const PORT = process.env.PORT || 3000

const corsOptions = {
    origin: 'https://backend-development-becipes.fly.dev/',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
}

export { corsOptions }