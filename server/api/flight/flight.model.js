'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

//A tuple to represent the number of seats present during the particular day of the flight.
var seatAvailableObj = new Schema({ 
	date: Date,
	no_of_seats: { type: Number, default: 4 }},
	{ noId: true
});

var FlightSchema = new Schema({
  Flight_No: String,
  Origin: String,
  Destination: String,
  Depart_Time: { type: Date, default: Date.now },
  Arrival_Time: { type: Date, default: Date.now },
  Duration: Number,
  RunningDays: [String], // An array of days when the flight runs weekly. [Mon, Tues, Wed]
  seatsAvailable: [seatAvailableObj] //Array to store seatAvailableObj Schema.
});

module.exports = mongoose.model('Flight', FlightSchema);