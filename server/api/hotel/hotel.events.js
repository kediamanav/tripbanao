/**
 * Hotel model events
 */

'use strict';

import {EventEmitter} from 'events';
import Hotel from './hotel.model';
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

export default HotelEvents;
