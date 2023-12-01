import { prismaClient } from "../app/database.js"
import { decodeAccessToken } from "../helper/auth-utils.js"
import { ErrorWebResponse } from "../helper/web-response.js"

export const adminMiddleware = async (req, res, next) => {
    const token = req.get('Authorization')

    if (!token) {
        const response = ErrorWebResponse(401, "Unauthorized")
        res.status(401).json(response).end()

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
            const response = ErrorWebResponse(401, "Unauthorized")
            res.status(401).json(response).end()
            
            return
        }

        req.user = user
        const userRole = user.role?.role_name.toLowerCase()

        if (userRole !== 'admin') {
            const response = ErrorWebResponse(403, "Forbidden")
            res.status(403).json(response).end()
            
            return
        }

        next()
    } catch (error) {
        const response = ErrorWebResponse(401, "Unauthorized")
        res.status(401).json(response).end()
    }
}