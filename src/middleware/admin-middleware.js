import { prismaClient } from "../app/database.js"
import { decodeToken, getTokenPart } from "../helper/jwt-helper.js"
import { ErrorWebResponse } from "../helper/web-response.js"

export const adminMiddleware = async (req, res, next) => {
    const rawToken = req.get('Authorization')
    
    if (!rawToken) {
        const response = ErrorWebResponse(401, "Unauthorized")
        res.status(401).json(response).end()
        
        return
    }

    const token = await getTokenPart(rawToken)

    if (!token) {
        const response = ErrorWebResponse(401, "Unauthorized")
        res.status(401).json(response).end()
        
        return
    }
    
    try {
        const decodedToken = await decodeToken(token)

        const user = await prismaClient.user.findFirst({
            where: {
                id: decodedToken.id,
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
        // const response = ErrorWebResponse(401, "Unauthorized")
        // res.status(401).json(response).end()
        next(error)
    }
}