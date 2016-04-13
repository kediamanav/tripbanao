'use strict';

angular.module('tripbanaoApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/flights', {
        templateUrl: 'app/flights/flights.html',
        controller: 'FlightsCtrl'
      });
  });
