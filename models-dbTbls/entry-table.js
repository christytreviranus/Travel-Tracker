'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Entries', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        type: Sequelize.STRING,
        validate: {
          len: [1, 150]
        }  
      },
      note: {
        type: Sequelize.STRING
      },
      date: {
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
    return queryInterface.dropTable('Entries');
  }
};

Entries.associate = (models) => {
  Entries.belongsTo(models.Users, {
    foreignKey: 'id'
  });
}
Entries.associate = (models) => {
  Entries.belongsTo(models.Trips, {
    foreignKey: 'id'
  });
}
