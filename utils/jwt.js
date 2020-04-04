import JWT from 'jsonwebtoken'

function constructJwt(payload) {
  return JWT.sign(payload, process.env.SECRET_KEY, {
    expiresIn: 60 * 60 * 24 * 7,
  })
}

function getDataFromJwt(token) {
  try {
    var user = JWT.verify(token, process.env.SECRET_KEY)
  } catch (err) {
    throw err
  }
  return user
}

export {constructJwt, getDataFromJwt}
