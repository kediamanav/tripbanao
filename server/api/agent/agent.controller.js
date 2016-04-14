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
var request = require('request-json');

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

  var flights = {
    "name":"vatsalya"
  };
  res.json(flights);
};

// Deletes a Agent from the DB
exports.destroy = function(req, res) {
  Agent.findByIdAsync(req.params.id)
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};


// Queries all flight companies 
export function flightSearch(req, res) {

  console.log(req.body);

  var flightServers = [ 'http://10.147.169.33:9000']; //'http://10.147.8.201:9000',
  var client = request.createClient('');
  var data = req.body;
  var resp = [];
  var count = 0;
  var result = [];

  for(var i = 0; i < data.length; i++) {

    var dataToSend = {"id": i, "payLoad":data[i]};
    
    for(var j = 0; j < flightServers.length; j++) {
      client.post(
        flightServers[j] + '/api/flights/search',
        dataToSend,
        function (error, response, body) {
          count += 1;  

          console.log(body)
            if (!error && response.statusCode == 201) {
              var server = response.request.uri.host;
              var id = body.id;
              if(!result[id]) result[id] = {};
              result[id][server] = body.payLoad;
              if(count = data.length * flightServers.length) 
                res.json(result);
            } else {
              console.log('error ' + error);
            }
        }
    );
    }
  }
}