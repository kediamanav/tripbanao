'use strict';

var mongoose = require('bluebird').promisifyAll(require('mongoose'));
var Schema = mongoose.Schema;

//A tuple to represent the number of seats present during the particular day of the flight.
var seatAvailableObj = new Schema({ 
	date: { type: Date, default: Date.now },
	numberOfSeats: { type: Number, default: 4 }},
	{ noId: true
});

var FlightSchema = new Schema({
  companyName: String,
  flightNo: String,
  from: String,
  to: String,
  departureTime: { type: Date, default: Date.now },
  arrivalTime: { type: Date, default: Date.now },
  runningDays:{ type:[String], default: ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'] }, // An array of days when the flight runs weekly. [Mon, Tues, Wed]
  seatsAvailable:{ type:[seatAvailableObj], default: [] }, //Array to store seatAvailableObj Schema.
  price: { type: Number, default: 2000 },
  duration: { type: Number, default: 2.35 },
});

FlightSchema.index({companyName: 1, flightNo: 1, unique: true});

module.exports = mongoose.model('Flight', FlightSchema);