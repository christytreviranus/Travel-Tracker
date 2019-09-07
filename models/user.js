'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      allowNull: false,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    username: DataTypes.STRING,
    googleId: DataTypes.STRING,
    thumbnail: DataTypes.STRING,
    email: DataTypes.STRING,
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  User.associate = function(models) {
    // associations can be defined here
  };
  User.associate = (models) => {
    //User hasMany trips
    User.hasMany(models.trip, {
        foreignKey: 'UserId',
        onDelete: 'CASCADE'
    });
    //User hasMany entries
    //User.hasMany(models.entry);
}
  return User;
};