'use strict';

angular.module('tripbanaoApp')
  .factory('Travel',['$resource', function ($resource) {

    return $resource('/api/agents/flight',null,{
      'update': {method: 'POST', isArray: true}
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
  });
