const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tangilla-db', 'admin', 'password', {
    host: 'gbritez-instance.curuoibzooy9.sa-east-1.rds.amazonaws.com',
    dialect: 'mysql'
});


module.exports = sequelize;
