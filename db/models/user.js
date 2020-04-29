import {sequelize, Sequelize} from '../connectDB'

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

const User = sequelize.define('Users', definition)
User.associate = (models) => {
  User.belongsToMany(models.Circle, {
    through: models.CircleUser,
    foreignKey: 'userId',
  })
}

export default User
