import Router from 'koa-router'
import {User} from '../db'
const router = new Router()
router.get('user', async (ctx) => {
  const user = await User.findOne({
    where: {
      id: ctx.loggedInUser.id,
    },
  })
  ctx.body = user
})

export default router
