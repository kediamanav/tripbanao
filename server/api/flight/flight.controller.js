/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/flights              ->  index
 * POST    /api/flights              ->  create
 * GET     /api/flights/:id          ->  show
 * PUT     /api/flights/:id          ->  update
 * DELETE  /api/flights/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Flight = require('./flight.model');

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
      console.log("not found");
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
  console.log("removing")
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
}

// Gets a list of Flights
exports.index = function(req, res) {
  console.log("In here");
  Flight.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Flight from the DB
exports.show = function(req, res) {
  Flight.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Flight in the DB
exports.search = function(req, res) {
  console.log('inside flight module' + req.body)
  var jsonRequest = req.body
  console.log((new Date(jsonRequest.date)).toDateString().split()[0])
  Flight.findAsync({ 
    'origin': jsonRequest.from, 
    'destination': jsonRequest.to,
    'runningDays': { $in: [(new Date(jsonRequest.date)).toDateString().split()[0]]}
    // {'seatsAvailable': { 
    //     $in: [{ 'date': jsonRequest.date, 'numberOfSeats': 5 }]}}
    })
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Flight in the DB
exports.insert = function(req, res) {
  Flight.createAsync(req.body)
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Deletes a Flight from the DB
exports.destroy = function(req, res) {
  Flight.findOne({ 'flightNo': req.body.flightNo})
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
