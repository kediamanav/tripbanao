'use strict';

import mongoose from 'mongoose';
var Schema = mongoose.Schema;

//Schema to store the check in and check out time for each room in the hotel
var bookingsObj = new Schema({
	Check_In: { type: Date, default: Date.now},
	Check_Out: { type: Date, default: Date.now}},
	{ noId: true}
);

var HotelDetails = new Schema({
  Room_No: Number,
  Type: String,
  Price: Number,
  Bookings: [bookingsObj],//array of bookings for that particular room.
  No_of_Person: Number},
  { noId: true
});

//Assuming that there is single hotel per city. In that hotel, we store the details of the rooms.
var HotelSchema = new Schema({
  City: String,
  HotelDescription: [HotelDetails]
});

export default mongoose.model('Hotel', HotelSchema);