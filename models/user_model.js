
module.exports = function (sequelize, Sequelize) {
    let User = sequelize.define("User", {
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
    });
    return User;
};








