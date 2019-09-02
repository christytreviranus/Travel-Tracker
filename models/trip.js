'use strict';
module.exports = function (sequelize, Sequelize) {
    let Trip = sequelize.define("trip", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
        tripTitle: {
            type: Sequelize.STRING        
        },
        picture: {
            type: Sequelize.STRING
        },
        tripStart: {
            type: Sequelize.DATE   
        },
        tripEnd: {
            type: Sequelize.DATE, 
        },
        userId: {
            type: Sequelize.INTEGER
    }
    }, {});
    Trip.associate = (models) => {
        //Trip belongs to a user
        Trip.belongsTo(models.user);
        Trip.hasMany(models.entry);
      }
      return Trip;
};






