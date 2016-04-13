'use strict';

import mongoose from 'mongoose';

var HotelSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Hotel', HotelSchema);
