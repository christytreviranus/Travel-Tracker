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
    Entries.associate = (models) => {
      Entries.belongsTo(models.trips,{
        foreignKey: {
          allowNull: false
        }
      });
      Entries.belongsTo(models.users,{
        foreignKey: {
          allowNull: false
        }
      });
    };
};

  
