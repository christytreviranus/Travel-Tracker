module.exports = function(sequelize, DataTypes) {
    const Author = sequelize.define("author", {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
      uid: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          len: [1]
        }
      },
    });
  
    Author.associate = function(models) {
      Author.hasMany(models.travel_log, {
        onDelete: "cascade"
      });
    };
  
    return Author;
  };
  