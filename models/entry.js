'use strict';
module.exports = (sequelize, DataTypes) => {
  const Entry = sequelize.define('entry', {
    id: {
      allowNull: false,
      //autoIncrement: true,
      primaryKey: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    entryTitle: DataTypes.STRING,
    entryNote: DataTypes.STRING,
    picture: DataTypes.STRING,
    entryDate: DataTypes.DATE
  }, {});
  Entry.associate = function(models) {
    // associations can be defined here
  };
  Entry.associate = (models) => {
    Entry.belongsTo(models.trip, {
        foreignKey: 'TripId',
        onDelete: 'CASCADE'
    });
    }
  return Entry;
};