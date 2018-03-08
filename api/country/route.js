
const express = require('express');
const router = express.Router();
const countryController = require('./controller');
const authGuard = require('../global-service').globalVariable.authGuard;

router.post('/add', authGuard, countryController.addCountry);
router.get('/:id', authGuard, countryController.getCountryById);
router.get('/get/all', authGuard, countryController.getCountries);


// router.post('/yourRoute', your controller);
module.exports = router;
