import jwt from 'jsonwebtoken'

function generateAccessToken(user) {
  return jwt.sign({ id: user.id_user, role: user.role?.role_name }, process.env.SECRET, {
    expiresIn: '10m',
  })
}

function generateRefreshToken(user) {
  return jwt.sign({
    id: user.id_user
  }, process.env.SECRET, {
    expiresIn: '8h'
  })
}

function generateTokens(user) {
  const accessToken = generateAccessToken(user)
  const refreshToken = generateRefreshToken(user)

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