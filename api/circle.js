import Router from 'koa-router'
import {Circle, CircleUser} from '../db'
const router = new Router()
router.get('circle/:id', async (ctx) => {
  const circle = await Circle.findOne({
    where: {id: ctx.params.id},
    include: 'User',
  })
  if (circle) {
    ctx.body = circle
  } else {
    ctx.body = `Circle with id  ${ctx.params.id} not found`
  }
})

router.get('circles', async (ctx) => {
  const circles = await Circle.findAll()
  if (circles) {
    ctx.body = circles
  }
})
router.get('circle-users/:circleId', async (ctx) => {
  const circleUsers = await CircleUser.findAll({
    where: {circleId: ctx.params.circleId},
  })
  ctx.body = circleUsers
})
router.post('circle', async (ctx) => {
  const reqCircle = ctx.request.body
  const savedCircleObj = await Circle.create({
    name: reqCircle.name,
    description: reqCircle.description,
    createdBy: ctx.loggedInUser.id,
  })
  if (savedCircleObj) {
    await CircleUser.create({
      role: 'owner',
      circleId: savedCircleObj.id,
      userId: savedCircleObj.createdBy,
      addedBy: null,
    })
    ctx.body = 'Circle created successfull'
  }
})

export default router
