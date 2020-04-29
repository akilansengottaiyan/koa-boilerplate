import Router from 'koa-router'
import {Post} from '../db'
const router = new Router()
router.get('posts', async (ctx) => {
  const posts = await Post.findAll()
  if (posts) {
    ctx.body = posts
  }
})
router.get('post/:id', async (ctx) => {
  const post = await Post.findOne({
    where: {id: ctx.params.id},
    include: 'User',
  })
  if (post) {
    ctx.body = post
  } else {
    ctx.body = `post with id  ${ctx.params.id} not found`
  }
})
router.post('post', async (ctx) => {
  const reqPost = ctx.request.body
  const savedPostObj = await Post.create({
    title: reqPost.title,
    description: reqPost.description,
    parentCircle: reqPost.circle,
    postedBy: ctx.loggedInUser.id,
  })
  ctx.body = savedPostObj
})

export default router
