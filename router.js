import Koa from 'koa'
import Router from 'koa-router'
import auth from './auth'
import api from './api'

const app = new Koa()
const router = new Router()

router.get('/_health', (ctx) => (ctx.body = 'SERVER is running'))
router.use('/auth', auth.routes())
router.use('/v1', api.routes())
app.use(router.routes())
export default app
