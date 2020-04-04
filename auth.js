import Router from 'koa-router'
import bcrypt from 'bcryptjs'
import httpError from 'http-errors'
import User from './db/models/user'
import {constructJwt} from './utils/jwt'

const router = new Router()

router.post('/login', async (ctx) => {
  const reqLoginObj = ctx.request.body
  const existingUser = await User.findOne({where: {email: reqLoginObj.email}})
  if (!existingUser) {
    throw httpError(401, 'User not found. Try signing up')
  }
  if (!bcrypt.compareSync(reqLoginObj.password, existingUser.password)) {
    throw httpError(401, 'Invalid password. Try again.')
  }
  ctx.cookies.set(
    'accessToken',
    constructJwt({id: existingUser.id, email: existingUser.email}),
    {
      httpOnly: true,
    },
  )
  ctx.body = 'Login successful'
})

router.post('/signup', async (ctx) => {
  const reqUserObj = {...ctx.request.body}
  if (reqUserObj.password.length < 8) {
    throw httpError(400, 'Password should be of atleast 8 characters')
  } else {
    reqUserObj.password = bcrypt.hashSync(reqUserObj.password)
    const savedUserObj = await User.create(reqUserObj)
    ctx.cookies.set(
      'accessToken',
      constructJwt({id: savedUserObj.id, email: savedUserObj.emai}),
      {
        httpOnly: true,
      },
    )
    ctx.body = 'Signup successful'
  }
})

export default router
