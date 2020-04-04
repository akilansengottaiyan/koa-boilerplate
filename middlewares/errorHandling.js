import Sequelize from 'sequelize'

function errorHandling() {
  return async function errorHandlingMiddleWare(ctx, next) {
    try {
      await next()
    } catch (err) {
      if (err instanceof Sequelize.ValidationError) {
        ctx.status = 400
        ctx.body = err.errors[0].message
      } else {
        ctx.status = err.status
        ctx.body = err.message
      }
    }
  }
}

export default errorHandling
