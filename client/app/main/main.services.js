'use strict';

angular.module('tripbanaoApp')
  .factory('Travel',['$resource', function ($resource) {

    return $resource('/api/agents/flight/search',null,{
      'update': {method: 'POST', isArray: true}
    });
  }])
  .factory('FlightBook',['$resource', function ($resource) {

    return $resource('/api/agents/flight/hold',null,{
      'book': {method: 'POST'}
    });
  }])
  .factory('FlightPay',['$resource', function ($resource) {

    return $resource('/api/agents/flight/pay',null,{
      'pay': {method: 'POST'}
    });
  }])
  .factory('FlightRelease',['$resource', function ($resource) {

    return $resource('/api/agents/flight/release',null,{
      'release': {method: 'POST'}
    });
  }])
  .service('FlightDetail', function () {
  	var flight = [];

  	var putFlight = function(data){
  		flight.push(data);
  		console.log(data);
  	}

  	var getFlight = function(){
  		return flight;
  	}

    var resetFlight = function(){
      flight = [];
    }

  	return{
  		putFlight : putFlight,
  		getFlight : getFlight,
      resetFlight: resetFlight
  	};
  })
  .service('HotelDetail', function () {
    var hotel = {};

    var putHotel = function(data){
      hotel = data;
      console.log(hotel);
    }

    var getHotel = function(){
      return hotel;
    }

    var resetHotel = function(){
      hotel = {};
    }

    return{
      putHotel : putHotel,
      getHotel : getHotel,
      resetHotel: resetHotel
    };
  })
  .service('BookingDetail', function () {
    var flight = [];

    var putFlight = function(data){
      flight.push(data);
      console.log(data);
    }

    var getFlight = function(){
      return flight;
    }

    var resetFlight = function(){
      flight = [];
    }

    return{
      putFlight : putFlight,
      getFlight : getFlight,
      resetFlight: resetFlight
    };
  })
  .service('UserDetail', function () {
    var user = {};

    var putUser = function(data){
      user = data;
      console.log(user);
    }

    var getUser = function(){
      return user;
    }

    return{
      putUser : putUser,
      getUser : getUser
    };
  });
