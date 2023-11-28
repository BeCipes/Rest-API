import jwt from "jsonwebtoken"

export const decodeAccessToken = (token) => {
    const tokenParts = token.split(' ')

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        throw new Error('Invalid access token format')
    }

    const accessToken = tokenParts[1]

    try {
        const decodedToken = jwt.verify(accessToken, process.env.SECRET)
        return decodedToken
    } catch (error) {
        throw new Error('Invalid access token')
    }
}