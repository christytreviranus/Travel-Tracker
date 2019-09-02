
'use strict';
module.exports = function (sequelize, Sequelize) {
    let User = sequelize.define("user", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
          },
        username: {
            type: Sequelize.STRING        
        },
        googleId: {
            type: Sequelize.STRING    
        },
        thumbnail: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING    
        },
        password: {
            type: Sequelize.STRING, 
        }
    }, {});
    User.associate = (models) => {
        //User hasMany trips
        User.hasMany(models.trip);
        //User hasMany entries
        User.hasMany(models.entry);
    }
    return User;
};








