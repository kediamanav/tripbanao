/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/agents              ->  index
 * POST    /api/agents              ->  create
 * GET     /api/agents/:id          ->  show
 * PUT     /api/agents/:id          ->  update
 * DELETE  /api/agents/:id          ->  destroy
 */

 'use strict';
var mongoose = require('mongoose');
 var _ = require('lodash');
 var flightDB = require('./agent.model');
 var request = require('request-json');
 var ReadWriteLock = require('rwlock');
 var flightDB = require('./agent.model');

var flightServers = {'Emirates': 'http://10.147.8.201:9000'}//, ['http://localhost:9000']; //


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
 			console.log('removing db data');
 			console.log(entity);
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
		"companyName":"emirates",
		"from":"kolkata",
		"to":"chicago",
		"departureTime": "8 aug, 20:30",
		"arrivalTime": "9 aug, 15:30",
		"price": "47339",
		"duration": "29 hrs",
		"seatsAvailable" : 2
	},{
		"companyName":"air india",
		"from":"kolkata",
		"to":"chicago",
		"departureTime": "8 aug, 20:30",
		"arrivalTime": "9 aug, 15:30",
		"price": "41339",
		"duration": "24 hrs",
		"seatsAvailable" : 5
	},{
		"companyName":"ethiad",
		"from":"kolkata",
		"to":"chicago",
		"departureTime": "8 aug, 20:30",
		"arrivalTime": "9 aug, 15:30",
		"price": "45339",
		"duration": "32 hrs",
		"seatsAvailable" : 1
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


// Queries all flight companies 
export function flightSearch(req, res) {

	console.log('in search ');
	console.log(req.body);

	var data = req.body;
	var resp = [];
	var count = 0;
	var result = [];
	var lock = new ReadWriteLock();

	for(var i = 0; i < data.length; i++) {

		var dataToSend = {"id": i, "payLoad":data[i]};

		for(var j = 0; j < Object.keys(flightServers).length; j++) {
			var client = request.createClient(Object.values(flightServers)[j]);
			client.post(
				'/api/flights/search',
				dataToSend,
				function (error, response, body) {
					lock.writeLock(function(release) {
						count += 1;  
						release();
					});
					console.log('huha ' + body);
					if (!error && response.statusCode == 200) {
						var server = response.request.uri.host;
						var id = body.id;
						if(!result[id]) result[id] = {};
						result[id][server] = body.payLoad;

						var c;

						lock.readLock(function(release){
							c = count;
							release();
						});
						if(c == data.length * Object.keys(flightServers).length) {
							console.log('search result: ');
							console.log(result);
							res.json(result);
						}
					} else {
						console.log('huha error ' + error);
					}
				}
				);
		}
	}
}

function respondToManav(res, result){
	return function(entity) {
		var id = entity._id;
		var data = {'result': result,
					'id': id};
		console.log('check chcek');
		console.log(entity);
		console.log(data);
		res.json(data);
	}
}

// holding flight seats for ttl time
export function flightHold(req, res) {
	console.log('in hold ');
	console.log(req.body);

	var data = req.body;
	var lock = new ReadWriteLock();
	var count = 0;
	var okay = 1;
	var dbData = [];
	// console.log(dbData);

	for(var i = 0; i < data.length; i++) {
		var dataToSend = {'flightNo': data[i].flightNo, 
		'date': data[i].date, 
		'companyName': data[i].companyName,
		'numberOfSeats': data[i].seatsAvailed};
		console.log(dataToSend);

		dbData.push(dataToSend);
		console.log(dbData);

		var client = request.createClient(flightServers[data[i].companyName]);
		client.post(
			'/api/flights/hold',
			dataToSend,
			function(err, response, body){

				console.log("Reply received");
				console.log(body);

				lock.writeLock(function(release){
					count += 1;
					release();
				});
				if(!body.success) okay = 0;

				var c;

				lock.readLock(function(release){
					c = count;
					release();
				});
				if(c == data.length){
					console.log("All requests received");
					if(okay == 1) {
						console.log('everything okay');
						console.log(dbData);
						var x = {'data': dbData};
						flightDB.createAsync(x)
							.then(respondToManav(res, true));
					}
					else res.json({'result': false});
				}

			}
			);
	}

}	


function sendReleaseToCompany(res) {
	return function(entity) {
		console.log('in releasing');
		console.log(entity);
		var data = entity.data;
		var count = 0;
		var lock = new ReadWriteLock();

		for(var i = 0; i < data.length; i++) {
			var client = request.createClient(flightServers[data[i].companyName]);
			client.post(
				'/api/flights/release',
				data[i],
				function(error, response, body) {
					console.log('count = ' + count);
					console.log(body);
					lock.writeLock(function(release){
						count += 1;
						release();
					});
					if(error) {
						console.log(error);
					} else {
						var c;
						lock.readLock(function(release) {
							c = count;
							release();
						});
						console.log('count ====== ' + count)
						if(c == data.length){
							console.log('received all responses. now removing from db');
							flightDB.findByIdAsync(entity.id)
							.then(removeEntity(res))
							.catch(handleError(res));
						}
					}
				});
		}
	}
}



// flight release
export function flightRelease(req, res) {
	console.log('in release');
	console.log(req.body);

	var id = mongoose.Types.ObjectId(req.body.id);
	flightDB.findByIdAsync(id)
	.then(sendReleaseToCompany(res))
	.catch(handleError(res));
}	

// flight pay
export function flightPay(req, res) {
	console.log(req.body);

	var result = {
		"result":true
	}

	res.json(result);
}	
