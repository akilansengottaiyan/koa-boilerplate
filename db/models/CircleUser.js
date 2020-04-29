import {sequelize, Sequelize} from '../connectDB'

const ROLE = {
  OWNER: 'owner',
  MEMBER: 'member',
  FOLLOWER: 'follower',
}
const definition = {
  role: {
    type: Sequelize.DataTypes.ENUM,
    values: [ROLE.OWNER, ROLE.MEMBER, ROLE.FOLLOWER],
    defaultValue: ROLE.FOLLOWER,
    allowNull: false,
  },
}
const CircleUser = sequelize.define('CircleUser', definition)
CircleUser.associate = (models) => {
  CircleUser.belongsTo(models.User, {foreignKey: 'userId'})
  CircleUser.belongsTo(models.Circle, {foreignKey: 'circleId'})
}

export default CircleUser
