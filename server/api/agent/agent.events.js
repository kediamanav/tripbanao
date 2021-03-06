/**
 * Agent model events
 */

'use strict';

var EventEmitter = require('events').EventEmitter;
var Agent = require('./agent.model');
var AgentEvents = new EventEmitter();

// Set max event listeners (0 == unlimited)
AgentEvents.setMaxListeners(0);

// Model events
var events = {
  'save': 'save',
  'remove': 'remove'
};

// Register the event emitter to the model events
for (var e in events) {
  var event = events[e];
  Agent.schema.post(e, emitEvent(event));
}

function emitEvent(event) {
  return function(doc) {
    AgentEvents.emit(event + ':' + doc._id, doc);
    AgentEvents.emit(event, doc);
  }
}

module.exports = AgentEvents;
