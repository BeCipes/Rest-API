import { decodeToken, getTokenPart } from "./jwt-helper.js"

const getCurrentUserId = async (token) => {
    token = await getTokenPart(token)
    const decodedToken = await decodeToken(token)
    
    if (!decodedToken) {
        throw new ResponseError(401, "Token is not valid")
    }

    return decodedToken.id
}

export {
    getCurrentUserId
}