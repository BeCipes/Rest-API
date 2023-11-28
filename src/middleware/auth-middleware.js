import { prismaClient } from "../application/database.js"

export const authMiddleware = async (req, res, next) => {
    const token = req.get('Authorization')

    if (!token && req.path === '/login') {
        return next();
    }

    if (!token) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end()
        return
    }

    try {
        const decodedToken = decodeAccessToken(token)

        const user = await prismaClient.user.findFirst({
            where: {
                id_user: decodedToken.id,
            },
            include: {
                role: {
                    select: {
                        role_name: true
                    }
                }
            }
        })

        if (!user) {
            res.status(401).json({
                errors: "Unauthorized"
            }).end()
            return
        }

        req.user = user
        const userRole = user.role?.role_name.toLowerCase()

        if (userRole !== 'user') {
            return res.status(403).json({
                errors: "Forbidden"
            }).end()
        }

        next()
    } catch (error) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end()
    }
}