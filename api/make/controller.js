
const makeService = require('./service');
const Make = require('../../database/db').Make;

async function addMaker(req, res) {
    try {
        let maker = req.body;
        console.log(maker)
        let isFound = await Make.findOne({ where: { make: maker.make } })
        if (isFound)
            return res.status(400).send(`there is maker with the same name `);
        let addedMaker = await Make.create(maker);
        return res.send(addedMaker);
    } catch (error) {
        return res.status(500).send({ msg: "something went wrong ", error: error.message });
    }
}

async function getMakers(req, res) {
    try {
        let allMakers = await Make.findAll({});
        return res.send(allMakers);
    } catch (error) {
        return res.status(500).send({ msg: "something went wrong ", error: error.message });
    }
}
async function getMakerById(req, res) {
    try {
        let id = req.params.id;
        let maker = await Make.findById(id);
        return res.send(maker)
    } catch (error) {
        return res.status(500).send({ msg: "something went wrong ", error: error.message });

    }
}

module.exports = { addMaker, getMakers, getMakerById };
