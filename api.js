import Router from 'koa-router'
import JWT from 'jsonwebtoken'
import createError from 'http-errors'
import User from './db/models/user'
const router = new Router()
function isAuthorized(ctx, next) {
  const authorizationHeader = ctx.request.get('authorization')
  let token = authorizationHeader
    ? authorizationHeader
    : ctx.cookies.get('accessToken')
  if (!token) {
    createError('400', 'Token Required')
  } else {
    try {
      var decoded = JWT.verify(token, process.env.SECRET_KEY)
    } catch (err) {
      createError('400', err)
    }
  }
  ctx.currentUser = decoded
  return next()
}

router.get('/user', async ctx => {
  const newUser = await User.findOne({
    where: {
      email: 'akilan0306@gmail.com',
    },
  })
  ctx.body = `Hello ${newUser.firstName} . Welcome to Uniccan. Your email is ${newUser.email}`
})

export default router
export {isAuthorized}
