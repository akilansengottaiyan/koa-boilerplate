import User from './models/user'
import Circle from './models/circle'
import CircleUser from './models/circleuser'
import Post from './models/post'

const models = {User, Circle, CircleUser, Post}
Object.keys(models).forEach((modelName) => {
  if ('associate' in models[modelName]) {
    models[modelName].associate(models)
  }
})
export {User, Circle, CircleUser, Post}
