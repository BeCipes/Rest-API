import jwt, { decode } from 'jsonwebtoken'
import bcrypt from "bcrypt"
import { ResponseError } from "./../error/response-error.js"

const generateAccessToken = async (user) => {
  const token = jwt.sign({ id: user.id, role: user.role?.role_name }, process.env.SECRET, {
    expiresIn: '12h',
  })

  return token
}

const generateRefreshToken = async (user) => {
  const token = jwt.sign({
    id: user.id
  }, process.env.SECRET, {
    expiresIn: '30d'
  })

  return token
}

const getTokenPart = async (token) => {
    const tokenParts = token.split(' ')

    if (tokenParts.length !== 2 || tokenParts[0] !== 'Bearer') {
        throw new ResponseError(400, 'Invalid token format')
    }

    const tokenFinal = tokenParts[1]

    return tokenFinal
}

const decodeToken = async (token) => {
  try {
    const decodedToken = jwt.verify(token, process.env.SECRET)
    
    if (decodedToken.exp && decodedToken.exp * 1000 < Date.now()) {
      throw new ResponseError(400, 'Token has expired')
    }

    return decodedToken
  } catch (e) {
    throw new ResponseError(400, 'Invalid token')
  }
}

const generateTokens = async (user) => {
  const accessToken = await generateAccessToken(user)
  const refreshToken = await bcrypt.hash(await generateRefreshToken(user), 10)

  return {
    accessToken,
    refreshToken,
  }
}

export {
  generateAccessToken,
  generateRefreshToken,
  generateTokens,
  getTokenPart,
  decodeToken,
}