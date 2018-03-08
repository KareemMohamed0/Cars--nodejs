var Sequalize = require('sequelize');
const carService = require('./service');
const Car = require('../../database/db').Car;
const Make = require('../../database/db').Make;
const Country = require('../../database/db').Country;


async function addCar(req, res) {

    try {
        let car = req.body;
        console.log(car);
        let addedCar = await Car.create(car);
        return res.send(addedCar);
    } catch (error) {
        return res.status(500).send({ msg: "something went wrong ", error: error.message });

    }
}
async function getCars(req, res) {

    try {
        let cars = await Car.findAll({
            include: [
                { model: Make, required: true },
                { model: Country, required: true }
            ]
        });
        console.log('------------------------------------------------------------------',
            cars, '----------------------------------------------------------------------')
        return res.send(cars)
    } catch (error) {
        return res.status(500).send({ msg: "something went wrong ", error: error.message });

    }
}
async function getCarById(req, res) {

    try {
        let id = req.params.id;
        let car = await Car.findById(id, {
            include: [
                { model: Make, required: true },
                { model: Country, required: true }
            ]
        });
        return res.send(car);
    } catch (error) {
        return res.status(500).send({ msg: "something went wrong ", error: error.message });

    }
}
async function deleteCarById(req, res) {

    try {

        let id = req.params.id;
        console.log('------------------', id, '-----------------------------------')
        let deletedCar = await Car.destroy({ where: { id: id } });
        return res.send({ deleted: true, deletedCar })
    } catch (error) {
        return res.status(500).send({ msg: "something went wrong ", error: error.message });

    }
}


module.exports = {
    deleteCarById,
    getCarById,
    getCars,
    addCar
};
