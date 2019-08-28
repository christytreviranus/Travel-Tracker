module.exports = function(sequelize, DataTypes) {
    const  tLogs = sequelize.define("log", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      dateCreated: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      timeCreated: {
        allowNull: false,
        type: Sequelize.TIME,
      },
      entry: {
        type: DataTypes.TEXT,
        allowNull: false,
        len: [1]
      },
      updatedAt: {
        allowNull: true,
        type: Sequelize.DATE,
      },
      googleId: {
        type: DataTypes.STRING,
      }
    });
  
    tLogs.associate = function(models) {
      // We're saying that a Post should belong to an Author
      // A Post can't be created without an Author due to the foreign key constraint
      tLogs.belongsTo(models.travel_author, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return tLogs;
  };
  