'use strict';

import mongoose from 'mongoose';

var AgentSchema = new mongoose.Schema({
  name: String,
  info: String,
  active: Boolean
});

export default mongoose.model('Agent', AgentSchema);
