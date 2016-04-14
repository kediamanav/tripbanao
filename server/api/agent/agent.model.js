'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var ShortId = require('mongoose-shortid');
var Schema = mongoose.Schema;

var AgentSchema = new Schema({
  name: String,
  info: String,
  active: Boolean
});

module.exports = mongoose.model('Agent', AgentSchema);

var flightData = new Schema({
	flightNo: String,
	deptartureTime: Date,
	numberOfSeats: Number
});

var flightDB = new Schema({
	_id: ShortId,
	data: [flightData]
});

var hotelDB = new Schema({

});

module.exports = mongoose.model('flightDB', flightData);