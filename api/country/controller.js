
const countryService = require('./service');
const Country = require('../../database/db').Country;


async function addCountry(req, res) {
    try {
        let country = req.body;
        let isFound = await Country.findOne({ where: { country: country.country } })
        if (isFound)
            return res.status(400).send(`there is country with the same name `);
        let addedCountry = await Country.create(country);
        return res.send(addedCountry);
    } catch (error) {
        return res.status(500).send({ msg: "something went wrong ", error: error.message });
    }
}

async function getCountries(req, res) {
    try {
        let allCountries = await Country.findAll({});
        return res.send(allCountries);
    } catch (error) {
        return res.status(500).send({ msg: "something went wrong ", error: error.message });
    }
}
async function getCountryById(req, res) {
    try {
        let id = req.params.id;
        let country = await Country.findById(id);
        return res.send(country)
    } catch (error) {
        return res.status(500).send({ msg: "something went wrong ", error: error.message });

    }
}
module.exports = { getCountryById, getCountries, addCountry };
