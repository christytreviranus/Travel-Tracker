'use strict';
module.exports = (sequelize, DataTypes) => {
  const Trip = sequelize.define('trip', {
    id: {
      allowNull: false,
      //autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    tripTitle: DataTypes.STRING,
    picture: {
      type: DataTypes.STRING,
      allowNull: false
    },
    tripStart: DataTypes.DATE,
    tripEnd: DataTypes.DATE
  }, {});
  Trip.associate = function(models) {
    // associations can be defined here
  };
  Trip.associate = (models) => {
    //Trip belongs to a user
    Trip.belongsTo(models.user,{
        foreignKey: 'UserId',
        onDelete: 'CASCADE'
    });
    Trip.hasMany(models.entry,{
        foreignKey: 'TripId',
        onDelete: 'CASCADE'
    });
  }
  return Trip;
};