/**
 * Populate DB with sample data on server start
 * to disable, edit config/environment/index.js, and set `seedDB: false`
 */
'use strict';
var Flight = require('../api/flight/flight.model');
var compName = "Emirates"
Flight.find({}).removeAsync()
  .then(function() {
    Flight.create({
      "companyName": compName,
      "flightNo": "1234",
      "from": "kolkata",
      "to": "delhi",
      "runningDays": ["Mon","Tue","Wed"]
    }, 
    {
      "companyName": compName,
      "flightNo": "1235",
      "from": "mumbai",
      "to": "delhi",
      "runningDays": ["Fri","Sat","Sun"]
    }, 
    {
      "companyName": compName,
      "flightNo": "1236",
      "from": "kolkata",
      "to": "bangkok",
    }, 
    {
      "companyName": compName,
      "flightNo": "1237",
      "from": "delhi",
      "to": "mumbai",
      "runningDays": ["Thu"],
    }, 
    {
      "companyName": compName,
      "flightNo": "1238",
      "from": "mumbai",
      "to": "kolkata",
    }, 
    {
      "companyName": compName,
      "flightNo": "1239",
      "from": "kolkata",
      "to": "delhi",
    });
  });

