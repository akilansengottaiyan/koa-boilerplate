import {sequelize, Sequelize} from '../index'
const definition = {
  id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV4,
    primaryKey: true,
  },
  email: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notNull: true,
    },
  },
  firstName: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      notNull: true,
      len: [3, 20],
    },
  },
  lastName: {
    type: Sequelize.DataTypes.STRING,
    validate: {
      len: [3, 20],
    },
  },
  password: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {notNull: true},
  },
}
// console.log(sequelize)
const User = sequelize.define('Users', definition)
export default User
