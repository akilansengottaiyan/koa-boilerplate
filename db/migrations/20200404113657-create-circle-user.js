'use strict'
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('CircleUsers', {
      role: {
        type: Sequelize.ENUM,
        allowNull: false,
        values: ['owner', 'member', 'follower'],
      },
      circleId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Circles',
        },
      },
      userId: {
        type: Sequelize.DataTypes.UUID,
        allowNull: false,
        references: {
          model: 'Users',
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('CircleUsers')
  },
}
