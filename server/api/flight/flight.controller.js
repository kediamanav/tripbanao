/* Using Rails-like standard naming convention for endpoints.
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

function responseWithResult(res, statusCode, requestId) {
  statusCode = statusCode || 200;
  return function(entity) {
    if (entity) {
      entity = {'id': requestId, 'payLoad': entity};
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
  console.log(req.body);
  var jsonRequest = req.body.payLoad;
  Flight.findAsync({ 
    'from': jsonRequest.from, 
    'to': jsonRequest.to,
    'runningDays': { $in: [(new Date(jsonRequest.date)).toDateString().split(' ')[0]]},
    // 'seatsAvailable': { 
    //     $elemMatch: { 'date': new Date(jsonRequest.date), 'numberOfSeats': 67 } }
    })

    .then(responseWithResult(res, 201,req.body.id))
    .catch(handleError(res));
};

// Inserts a existing Flight in the DB
exports.insert = function(req, res) {
  Flight.createAsync(req.body)
    .then(responseWithResult(res))
    .catch(handleError(res));
};

exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  var jsonRequest = req.body;
  for(var i = 0; i < jsonRequest.seatsAvailable.length; i++)
    jsonRequest.seatsAvailable[i].date = new Date(jsonRequest.seatsAvailable[i].date).toDateString();
  
  Flight.update({'flightNo': jsonRequest.flightNo }, { $set: {'seatsAvailable': jsonRequest.seatsAvailable} }, function (err, tank) {
    if (err) return handleError(err);
    res.send(tank);
  });
};

// Deletes a Flight from the DB
exports.destroy = function(req, res) {
  Flight.findOne({ 'flightNo': req.body.flightNo})
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
