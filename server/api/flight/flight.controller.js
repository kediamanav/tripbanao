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
};

function handleEntityNotFound(res) {
  return function(entity) {
    if (!entity) {
      console.log("not found");
      res.status(404).end();
      return null;
    }
    return entity;
  };
};

function removeEntity(res) {
  console.log("removing");
  return function(entity) {
    if (entity) {
      return entity.removeAsync()
        .then(function() {
          res.status(204).end();
        });
    }
  };
};

function updateSeatAvailableArray(req,res) {
  var jsonRequest = req.body;
  
  Flight.update({'flightNo': jsonRequest.flightNo }, { $set: {'seatsAvailable': jsonRequest.seatsAvailable} }, function (err, tank) {
    if (err) return handleError(err);
    if (res) return res.json(tank);
    else return tank;
  });
};

function insertSeatAvailability(flightNo, date, numberOfSeats) {
  console.log("inserting");
  console.log(flightNo);
  console.log(date);
  console.log(numberOfSeats);
  if (numberOfSeats < 0 ) return new Error("Number of Seats not available");
  var newData = {"date": date, "numberOfSeats": numberOfSeats};

  Flight.update({'flightNo': flightNo }, { $push: {'seatsAvailable': newData} }, function (err, res) {
    if (err) return err;
    console.log(res);
  });
  console.log("inserted");

}

function updateSeatAvailability(flightNo, date, numberOfSeats, res) {
  console.log("inserting");
  console.log(flightNo);
  console.log(date);
  console.log(numberOfSeats);
  if (numberOfSeats < 0 ) {
    res.json({'success': 0});
    return;
  }
  var newData = {"date": date, "numberOfSeats": numberOfSeats};

  Flight.update({'flightNo': flightNo, 'seatsAvailable.date': date }, { $set: {'seatsAvailable.$.numberOfSeats': numberOfSeats} }, function (err, result) {
    if (err) return err;
    console.log(result);
    res.json({'success': 1});
  });
  console.log("inserted");

}

function sendSearchResult(id, jsonRequest, requestDate, flight, res){
  var result = []
  for(var i = 0; i < flight.length; i++){ //Checks if any pre-booking of the flight on that day
    var numSeats = 0; // Assuming no pre-booking

    //Check if the entry for that particular date is present.
    for(var j = 0; j < flight[i].seatsAvailable.length; j++){
      if(flight[i].seatsAvailable[j].date.getTime() == requestDate.getTime())
        numSeats = flight[i].seatsAvailable[j].numberOfSeats;
    }

    //If the entry is not present then push it in the database and update numberOfSeats to send.
    if(numSeats == 0){
      insertSeatAvailability(flight[i].flightNo, new Date(jsonRequest.date), 5);
      numSeats = 5;
    }

    var tempResult = {
      'from': jsonRequest.from,
      'to': jsonRequest.to,
      'arrivalTime': flight[i].arrivalTime,
      'departureTime': flight[i].departureTime,
      'flightNo': flight[i].flightNo,
      'companyName': flight[i].companyName,
      'price': flight[i].price,
      'duration': flight[i].duration,
      'seatsAvailable': numSeats
    };
    result.push(tempResult);
  }
  res.json({'id': id, 'payLoad': result});
}

function holdFlightStatus(res, date, lessNumberOfSeats){
  return function(entity){
    if(entity){
      console.log(entity[0]);
      for(var i = 0; i < entity[0].seatsAvailable.length; i++)
        if (entity[0].seatsAvailable[i].date.getTime() == date.getTime())
          updateSeatAvailability(entity[0].flightNo, date, entity[0].seatsAvailable[i].numberOfSeats - lessNumberOfSeats, res);
    }
  }
}


// Creates a new Flight in the DB
exports.search = function(req, res) {
  
  var jsonRequest = req.body.payLoad;
  var requestDate = new Date(jsonRequest.date);
  
  Flight.findAsync({ 
    'from': jsonRequest.from, 
    'to': jsonRequest.to,
    'runningDays': { $in: [requestDate.toDateString().split(' ')[0]]}}, function(err, flight){
        if (err) throw err;
        sendSearchResult(req.body.id, jsonRequest, requestDate, flight, res);
    });
};

// Inserts a existing Flight in the DB
exports.insert = function(req, res) {
  Flight.createAsync(req.body)
    .then(responseWithResult(res))
    .catch(handleError(res));
};

//Updates the seatAvailabilityArray with a new array for debugging purposes
exports.update = function(req, res) {
  if (req.body._id) {
    delete req.body._id;
  }

  return updateSeatAvailableArray(req, res);
};

// Deletes a Flight from the DB
exports.destroy = function(req, res) {
  Flight.findOne({ 'flightNo': req.body.flightNo})
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
};

exports.hold = function(req, res) {
  
  var jsonRequest = req.body.payLoad;
  var requestDate = new Date(jsonRequest.date);
  
  Flight.findAsync({ 'flightNo': jsonRequest.flightNo})
    .then(holdFlightStatus(res, requestDate, jsonRequest.numberOfSeats));
}