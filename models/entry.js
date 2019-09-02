'use strict';
module.exports = function (sequelize, Sequelize) {
    let Entry = sequelize.define("entry", {
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        entryTitle: {
            type: Sequelize.STRING
        },
        entryNote: {
            type: Sequelize.TEXT,
            len: [1, 1000]
        },
        picture: {
            type: Sequelize.STRING
        },
        entryDate: {
            type: Sequelize.DATE
        },
        tripId: {
            type: Sequelize.INTEGER
        }
    }, {});
    Entry.associate = (models) => {
    Entry.belongsTo(models.trip);
    }
    return Entry;
};