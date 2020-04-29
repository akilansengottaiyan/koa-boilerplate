import {sequelize, Sequelize} from '../connectDB'
const definition = {
  id: {
    type: Sequelize.DataTypes.UUID,
    defaultValue: Sequelize.DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: Sequelize.DataTypes.STRING,
    validate: {
      notNull: true,
      len: [3, 20],
    },
    allowNull: false,
  },
  description: {
    type: Sequelize.DataTypes.STRING,
  },
  postedBy: {
    type: Sequelize.DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'user',
    },
  },
  parentCircle: {
    type: Sequelize.DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'circle',
    },
  },
}
const Post = sequelize.define('Post', definition)
Post.associate = (models) => {
  Post.belongsTo(models.User, {
    foreignKey: 'postedBy',
  })
  Post.belongsTo(models.Circle, {
    foreignKey: 'parentCircle',
  })
}

export default Post
