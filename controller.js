const core = require('./core');
const dataService = require('./data-service')

async function controller(req, res) {
    if (!req.body) {
        res.sendStatus(404);
    } else {
        try {
            const result = await core.findSynonyms(req.body.text);
            dataService.Insert(req.body.text, JSON.stringify(result))
            res.json(result);
        }
        catch (err) {
            res.json(err)
        }
    }
}

module.exports = controller;