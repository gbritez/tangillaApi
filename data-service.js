const sequelize = require('./data-access');
const Activity = require('./models/activity');

function Insert(textValue, analysisValue) {

    Activity.create({
        text: textValue,
        analysis: analysisValue
    });
}

module.exports = { Insert }