const core = require('./core');
const dataService = require('./data-service')
async function controller(req, res) {

    if (!req.body) {
        res.sendStatus(404);
    } else {
        const result = await core.lookUpSynonyms(req.body.text);
        dataService.Insert(req.body.text, JSON.stringify(result))
        res.json(result);
    }
}

module.exports = controller;