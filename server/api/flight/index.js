'use strict';

var express = require('express');
var controller = require('./flight.controller');

var router = express.Router();

router.post('/search', controller.search);
router.post('/insert', controller.insert);
router.post('/delete', controller.destroy);

module.exports = router;
