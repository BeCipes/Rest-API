import { prismaClient } from "../app/database.js"
import { getTokenPart, decodeToken } from "../helper/jwt-helper.js"
import { ErrorWebResponse } from "../helper/web-response.js"

export const authMiddleware = async (req, res, next) => {
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
        const user = await prismaClient.user.findFirst({
            where: {
                token: token,
            }
        })

        if (!user) {
            const response = ErrorWebResponse(401, "Unauthorized")
            res.status(401).json(response).end()

            return
        }

        next()
    } catch (error) {
        const response = ErrorWebResponse(401, "Unauthorized")
        res.status(401).json(response).end()
    }
}