'use strict';

var express = require('express');
var controller = require('./flight.controller');

var router = express.Router();

router.post('/search', controller.search);
router.post('/insert', controller.insert);
router.post('/delete', controller.destroy);
router.post('/update', controller.update);
router.post('/hold', controller.update);
router.post('/confirm', controller.update);
router.post('/cancel', controller.update);

module.exports = router;
