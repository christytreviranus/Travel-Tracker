module.exports = function (sequelize, Sequelize) {
    let Entry = sequelize.define("Entry", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        entryTitle: {
            type: Sequelize.STRING
        },
        entryNote: {
            type: Sequelize.TEXT,
            len: [1, 1000]
        },
        picture: {
            type: Sequelize.STRING
        },
        entryDate: {
            type: Sequelize.DATE
        }
    });
    return Entry;
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
  
