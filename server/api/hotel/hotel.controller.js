/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/hotels              ->  index
 * POST    /api/hotels              ->  create
 * GET     /api/hotels/:id          ->  show
 * PUT     /api/hotels/:id          ->  update
 * DELETE  /api/hotels/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Hotel = require('./hotel.model');

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

function responseWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      res.status(statusCode).json(entity);
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function saveUpdates(updates) {
  return function(entity) {
    var updated = _.merge(entity, updates);
    return updated.saveAsync()
      .spread(function(updated) {
        return updated;
      });
  };
}

function removeEntity(res) {
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

function getRooms (jsonRequest, res) {
  return function (entity) {
    if (entity) {
      
      var searchResult = []
      var requestDateTiming = new Date(jsonRequest.date).getTime();
      
      for (var i = 0; i < entity.hotelDescription.length; i++) {
        var currentRoom = entity.hotelDescription[i];
        var currentCheckInTiming = new Date(currentRoom.checkIn).getTime();
        var currentCheckOutTiming = new Date(currentRoom.checkOut).getTime();
        //Checks if the room is available for the requested date.
        if (currentCheckInTiming <= requestDateTiming && requestDateTiming <= currentCheckOutTiming) continue;
        //If available, make the necessary details and push to the result list.
        var tempResult = {
          "roomNo": currentRoom.roomNo,
          "type": currentRoom.type,
          "price": currentRoom.price,
          "numberOfPersons": currentRoom.numberOfPersons,
          "city": jsonRequest.city,
          "date": jsonRequest.date
        };
        searchResult.append(tempResult);
      }
      //The result is a list of rooms available for booking.
      res.json(searchResult);
    }
  };
}

// Searches a new Hotel in the DB
exports.search = function(req, res) {
  
  var jsonRequest = req.body;
  
  console.log("search")
  console.log(jsonRequest);
  
  Hotel.findAsync({'city': jsonRequest.city})
    .then(getRooms(jsonRequest,res));
};

// Inserts a new Hotel in the DB
exports.insert = function(req, res) {
  Hotel.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Hotel in the DB
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Hotel.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(saveUpdates(req.body))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Hotel from the DB
exports.destroy = function(req, res) {
  var jsonRequest = req.body;
  Hotel.findAsync({ 'city': jsonRequest.city}, 
                  {'hotelDescription': {$elemMatch: {'roomNo': jsonRequest.roomNo}}})
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
