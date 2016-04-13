'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

//A tuple to represent the number of seats present during the particular day of the flight.
var seatAvailableObj = new Schema({ 
	date: Date,
	numberOfSeats: { type: Number, default: 4 }},
	{ noId: true
});

var FlightSchema = new Schema({
  flightNo: String,
  origin: String,
  destination: String,
  departureTime: { type: Date, default: Date.now },
  arrivalTime: { type: Date, default: Date.now },
  duration: Number,
  runningDays: [String], // An array of days when the flight runs weekly. [Mon, Tues, Wed]
  seatsAvailable: [seatAvailableObj] //Array to store seatAvailableObj Schema.
});

module.exports = mongoose.model('Flight', FlightSchema);