import Koa from 'koa'
import compress from 'koa-compress'
import mount from 'koa-mount'
import bodyParser from 'koa-bodyparser'
import './init'
import errorHandling from './middlewares/errorHandling'
import routes from './router'
const app = new Koa()
app.use(compress())
app.use(errorHandling())
app.use(bodyParser())
app.use(mount(routes))
app.listen(process.env.PORT)
console.log(`Server listening on http://localhost:${process.env.PORT}`)
