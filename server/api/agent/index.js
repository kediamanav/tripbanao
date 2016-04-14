'use strict';

var express = require('express');
var controller = require('./agent.controller');

var router = express.Router();

// router.get('/', controller.index);
// router.get('/:id', controller.show);
// router.post('/', controller.create);
router.post('/', controller.update);
// router.patch('/:id', controller.update);
// router.delete('/:id', controller.destroy);

router.post('/flight', controller.flightSearch);

module.exports = router;
