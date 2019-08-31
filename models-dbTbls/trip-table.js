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
        type: Sequelize.STRING,
        validate: {
          len: [1, 150]
        }
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
      tripRating: {
        type: Sequelize.STRING
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

Trips.associate = (models) => {
  Trips.belongsTo(models.Users, {
    foreignKey: 'id'
  });
}