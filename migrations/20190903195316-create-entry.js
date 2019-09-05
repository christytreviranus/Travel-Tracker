'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('entries', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4
      },
      entryTitle: {
        type: Sequelize.STRING
      },
      entryNote: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.STRING,
        allowNull: false
      },
      entryDate: {
        type: Sequelize.DATE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      TripId: {
        type: Sequelize.UUID,
        onDelete: 'CASCADE',
        references: {
            model: 'trips',
            key: 'id'
        }
    }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('entries');
  }
};