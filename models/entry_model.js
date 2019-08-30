module.exports = function (sequelize, Sequelize) {
    let Entry = sequelize.define("Entry", {
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
            type: Sequelize.STRING
        },
        entryDate: {
            type: Sequelize.DATE
        }
    });
    return Entry;
};
