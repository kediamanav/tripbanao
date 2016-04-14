'use strict';

angular.module('tripbanaoApp')
  .factory('Travel',['$resource', function ($resource) {

    //Change here to /api/agents/flight
    return $resource('/api/agents/',null,{
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
  	var flight = {};

  	var putFlight = function(data){
  		flight = data;
  		console.log(flight);
  	}

  	var getFlight = function(){
  		return flight;
  	}

  	return{
  		putFlight : putFlight,
  		getFlight : getFlight
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

    return{
      putHotel : putHotel,
      getHotel : getHotel
    };
  })
  .service('BookingDetail', function () {
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
