//Make edits here and remove comment after done

'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Trips', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      tripTitle: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.STRING
      },
      tripStart: {
        type: Sequelize.DATE
      },
      tripEnd: {
          type: Sequelize.DATE
      },      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Trips');
  }
};