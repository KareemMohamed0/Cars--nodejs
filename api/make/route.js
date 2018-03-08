
const express = require('express');
const router = express.Router();
const makeController = require('./controller');
const authGuard = require('../global-service').globalVariable.authGuard;


router.post('/add', authGuard, makeController.addMaker);
router.get('/:id', authGuard, makeController.getMakerById);
router.get('/get/all', authGuard, makeController.getMakers);

module.exports = router;
