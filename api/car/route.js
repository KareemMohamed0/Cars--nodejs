
const express = require('express');
const router = express.Router();
const carController = require('./controller');
const authGuard = require('../global-service').globalVariable.authGuard;

router.post('/add', authGuard, carController.addCar);
router.delete('/delete/:id', authGuard, carController.deleteCarById);
router.get('/:id', authGuard, carController.getCarById);
router.get('/get/all', authGuard, carController.getCars);

module.exports = router;
