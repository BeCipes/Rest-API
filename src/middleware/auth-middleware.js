import { prismaClient } from "../application/database.js"
import { getTokenPart } from "../helper/auth-utils.js"

export const authMiddleware = async (req, res, next) => {
    const token = req.get('Authorization')

    if (!token) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end()
        return
    }

    try {
        const tokenPart = getTokenPart(token)

        const user = await prismaClient.user.findFirst({
            where: {
                token: tokenPart,
            }
        })
        console.log(user)

        if (!user) {
            res.status(401).json({
                errors: "Unauthorized"
            }).end()
            return
        }

        // req.user = user
        // const userRole = user.role?.role_name.toLowerCase()

        // if (userRole !== 'user') {
        //     return res.status(403).json({
        //         errors: "Forbidden"
        //     }).end()
        // }

        next()
    } catch (error) {
        res.status(401).json({
            errors: "Unauthorized"
        }).end()
    }
}