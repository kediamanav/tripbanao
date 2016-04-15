'use strict';

var express = require('express');
var controller = require('./flight.controller');

var router = express.Router();

router.post('/search', controller.search);
router.post('/insert', controller.insert);
router.post('/delete', controller.destroy);
router.post('/update', controller.update);
router.post('/hold', controller.hold);
router.post('/cancel', controller.cancel);
router.post('/release', controller.cancel);

module.exports = router;