/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var config = require('./config/environment');

<<<<<<< HEAD
//Connect to MongoDB
=======
// Connect to MongoDB
>>>>>>> f132ecaf74d0e61c25ab55b4efa013121917ff71
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
  console.error('MongoDB connection error: ' + err);
  process.exit(-1);
});
<<<<<<< HEAD
=======


//================================



// Connect to Replica Set

// var options = { 
//     server: { 
//         socketOptions: { 
//             keepAlive: 1000, 
//             connectTimeoutMS:30000, 
//             socketTimeoutMS:90000 } 
//         },
//     replset: {
//     	auto_reconnect:false,
//         socketOptions: { 
//             keepAlive: 1000, 
//             connectTimeoutMS : 30000 , 
//             socketTimeoutMS: 90000  
//         }, 
//         rs_name: 'rs0' 
//      } };

// var uri = "mongodb://localhost:27017,manav:manav@10.5.16.241:27017,vatsalyachauhan:fuckTHem@10.5.22.244:27017/tripbanao-dev";

// // var uri = "mongodb://localhost:27018,localhost:27017/tripbanao-dev";

// mongoose.connect(uri, options);
// mongoose.connection.on('error', function(err) {
//   console.error('MongoDB connection error: ' + err);
//   process.exit(-1);
// });
>>>>>>> f132ecaf74d0e61c25ab55b4efa013121917ff71


// Populate databases with sample data
if (config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();
var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

// Start server
function startServer() {
  server.listen(config.port, config.ip, function() {
    console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
  });
}

setImmediate(startServer);

// Expose app
exports = module.exports = app;
