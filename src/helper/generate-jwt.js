import jwt from 'jsonwebtoken'
import bcrypt from "bcrypt"

const generateAccessToken = async (user) => {
  const token = jwt.sign({ id: user.id_user, role: user.role?.role_name }, process.env.SECRET, {
    expiresIn: '12h',
  })

  return token
}

const generateRefreshToken = async (user) => {
  const token = jwt.sign({
    id: user.id_user
  }, process.env.SECRET, {
    expiresIn: '30d'
  })

  return token
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
  generateTokens
}