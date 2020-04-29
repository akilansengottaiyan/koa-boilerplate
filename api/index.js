import Router from 'koa-router'
import JWT from 'jsonwebtoken'
import httpError from 'http-errors'
import user from './user'
import circle from './circle'
import post from './post'
const router = new Router()
function isAuthorized(ctx, next) {
  const authorizationHeader = ctx.request.get('authorization')
  let token = authorizationHeader
    ? authorizationHeader
    : ctx.cookies.get('accessToken')
  if (!token) {
    httpError(400, 'Token Required')
  } else {
    try {
      var decoded = JWT.verify(token, process.env.SECRET_KEY)
    } catch (err) {
      httpError(400, err)
    }
  }
  ctx.loggedInUser = decoded
  return next()
}
router.use(isAuthorized)
router.use('/', user.routes())
router.use('/', circle.routes())
router.use('/', post.routes())

export default router
