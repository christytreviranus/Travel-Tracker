//Make edits here and remove comment after done

'use strict';
module.exports = (sequelize, DataTypes) => {
  const projects = sequelize.define('projects', {
    name: DataTypes.STRING,
    picture: DataTypes.STRING,
    instructions: DataTypes.STRING
  }, {});
  projects.associate = function(models) {
    // associations can be defined here

    projects.belongsTo(models.User, {
      foreignKey: {
        allowNull: false
      }
    });

    projects.belongsTo(models.categories, {
      foreignKey: {
        allowNull: false
      }
    });

    projects.belongsTo(models.status, {
      foreignKey: {
        allowNull: false
      }
    });

    projects.hasMany(models.tasks, {
      onDelete: "cascade"
    });

    projects.hasMany(models.projectLog, {
      onDelete: "cascade"
    });
  };
  return projects;
};