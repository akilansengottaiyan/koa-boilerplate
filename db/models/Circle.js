import {sequelize, Sequelize} from '../connectDB'
const definition = {
  id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.DataTypes.STRING,
    validate: {
      notNull: true,
      len: [3, 20],
    },
    allowNull: false,
  },
  description: {
    type: Sequelize.DataTypes.STRING,
    validate: {
      notNull: true,
    },
    allowNull: false,
  },
  createdBy: {
    type: Sequelize.DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'user',
    },
  },
}
const Circle = sequelize.define('Circle', definition)
Circle.associate = (models) => {
  Circle.belongsToMany(models.User, {
    through: models.CircleUser,
    foreignKey: 'circleId',
  })
  Circle.belongsTo(models.User, {
    foreignKey: 'createdBy',
  })
}

export default Circle
