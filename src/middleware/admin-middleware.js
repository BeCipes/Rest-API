import { prismaClient } from "../application/database.js"

export const adminMiddleware = async (req, res, next) => {
    const token = req.get('Authorization')
    if (!token) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end()
    }
    
    const user = await prismaClient.user.findFirst({
        where: {
            token: token
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
    } 

    req.user = user
    const userRole = user.role?.role_name.toLowerCase()

    if (userRole !== 'admin') {
        return res.status(403).json({
            errors: "Forbidden"
        }).end()
    }
    
    next()
}