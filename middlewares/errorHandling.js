import Sequelize from 'sequelize'

function errorHandling() {
  return async function errorHandlingMiddleWare(ctx, next) {
    try {
      await next()
    } catch (err) {
      console.log(err)
      if (err instanceof Sequelize.ValidationError) {
        ctx.status = 400
        ctx.body = err.errors[0].message
      } else {
        if (err.status) {
          ctx.status = err.status
          ctx.body = err.body
        } else {
          ctx.status = 500
          ctx.body = 'Internal Server Error'
        }
      }
    }
  }
}

export default errorHandling
