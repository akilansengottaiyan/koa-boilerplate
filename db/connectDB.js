'use strict'
import Sequelize from 'sequelize'
const env = process.env.NODE_ENV || 'development'
const config = require(__dirname + '/config.js')[env]
const db = {}
const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
)
db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
