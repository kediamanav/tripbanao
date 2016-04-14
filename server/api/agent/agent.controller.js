/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/agents              ->  index
 * POST    /api/agents              ->  create
 * GET     /api/agents/:id          ->  show
 * PUT     /api/agents/:id          ->  update
 * DELETE  /api/agents/:id          ->  destroy
 */

'use strict';

var _ = require('lodash');
var Agent = require('./agent.model');

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

// Gets a list of Agents
exports.index = function(req, res) {
  console.log("in here index");
  Agent.findAsync()
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Gets a single Agent from the DB
exports.show = function(req, res) {
  console.log("in here get");
  Agent.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(responseWithResult(res))
    .catch(handleError(res));
};

// Creates a new Agent in the DB
exports.create = function(req, res) {
  Agent.createAsync(req.body)
    .then(responseWithResult(res, 201))
    .catch(handleError(res));
};

// Updates an existing Agent in the DB
exports.update = function(req, res) {
  console.log("in update");
  console.log(req.params);
  console.log(req.body);

  var flights = [{
      "name":"emirates",
      "from":"kolkata",
      "to":"chicago",
      "from_date": "8 aug, 20:30",
      "to_date": "9 aug, 15:30",
      "price": "47339",
      "duration": "29 hrs"
    },{
      "name":"air india",
      "from":"kolkata",
      "to":"chicago",
          "from_date": "8 aug, 20:30",
          "to_date": "9 aug, 15:30",
      "price": "41339",
      "duration": "24 hrs"
    },{
      "name":"ethiad",
      "from":"kolkata",
      "to":"chicago",
          "from_date": "8 aug, 20:30",
          "to_date": "9 aug, 15:30",
      "price": "45339",
      "duration": "32 hrs"
    },
  ];

  var hotels = [{
      "name":"hyatt",
      "checkin": "8 aug, 20:30",
      "checkout": "9 aug, 15:30",
      "price": "47339",
      "duration": "29 hrs",
      "location": "howrah"
    },{
      "name":"hyatt",
      "checkin": "8 aug, 20:30",
      "checkout": "9 aug, 15:30",
      "price": "47339",
      "duration": "29 hrs",
      "location": "howrah"
    },{
      "name":"hyatt",
      "checkin": "8 aug, 20:30",
      "checkout": "9 aug, 15:30",
      "price": "47339",
      "duration": "29 hrs",
      "location": "howrah"
    },
  ];


  if(req.params.id==2)
    res.json(hotels);
  else
    res.json(flights);
};

// Deletes a Agent from the DB
exports.destroy = function(req, res) {
  Agent.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};
