const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tangilla-db', 'gbritez', 'gbritez', {
    host: 'localhost',
    dialect: 'mysql'
});


module.exports = sequelize;
