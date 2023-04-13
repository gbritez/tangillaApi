const sequelize = require('./data-access'); // Importa la instancia de Sequelize que ya creaste
const Activity = require('./models/activity');

function Insert(textValue, analysisValue) {

    Activity.create({
        text: textValue,
        analysis: analysisValue.toString()
    });
}

module.exports = { Insert }