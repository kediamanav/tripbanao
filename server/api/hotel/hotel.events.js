/**
 * Hotel model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Hotel = require('./hotel.model');
var HotelEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
HotelEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Hotel.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    HotelEvents.emit(event + ':' + doc._id, doc);
    HotelEvents.emit(event, doc);
  }
}

module.exports = HotelEvents;
