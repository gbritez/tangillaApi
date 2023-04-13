const { DataTypes } = require('sequelize');
const sequelize = require('../data-access'); // Importa la instancia de Sequelize que ya creaste


const Activity = sequelize.define('activity', {
    text: {
        type: DataTypes.TEXT('medium'),
        allowNull: false
    },
    analysis: {
        type: DataTypes.TEXT('medium'),
        allowNull: false
    },
});

Activity.sync();

module.exports = Activity;
