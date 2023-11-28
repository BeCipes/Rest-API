import jwt from 'jsonwebtoken'

function generateAccessToken(user) {
  return jwt.sign({ id_user: user.id_user }, process.env.SECRET, {
    expiresIn: '5m',
  })
}

function generateRefreshToken(user) {
  return jwt.sign({
    id_user: user.id_user
    // jti
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