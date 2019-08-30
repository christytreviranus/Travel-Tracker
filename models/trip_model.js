module.exports = function (sequelize, Sequelize) {
    let Trip = sequelize.define("Trip", {
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
        }
    });
    return Trip;
};





