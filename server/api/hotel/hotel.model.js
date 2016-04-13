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
  type: String,
  price: Number,
  bookings: [bookingsObj],//array of bookings for that particular room.
  numberOfPerson: Number},
  { noId: true
});

//Assuming that there is single hotel per city. In that hotel, we store the details of the rooms.
var HotelSchema = new Schema({
  city: String,
  hotelDescription: [HotelDetails]
});

export default mongoose.model('Hotel', HotelSchema);