'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema;

//Schema to store the check in and check out time for each room in the hotel
var bookingsObj = new Schema({
	checkIn: { type: Date, default: Date.now},
	checkOut: { type: Date, default: Date.now}},
	{ noId: true}
);

var HotelDetails = new Schema({
  roomNo: Number,
  type: { type: String, default: "Double AC" },
  price: { type: Number, default: 2530},
  bookings: { type:[bookingsObj], default: [] }, //array of bookings for that particular room.
  numberOfPersons: Number},
  { noId: true
});

//Assuming that there is single hotel per city. In that hotel, we store the details of the rooms.
var HotelSchema = new Schema({
  city: String,
  hotelDescription: [HotelDetails]
});

HotelSchema.index({city: 1, roomNo: 1, unique: true});

export default mongoose.model('Hotel', HotelSchema); 