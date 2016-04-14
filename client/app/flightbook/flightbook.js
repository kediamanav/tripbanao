'use strict';

angular.module('tripbanaoApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/flightbook', {
        templateUrl: 'app/flightbook/flightbook.html',
        controller: 'FlightbookCtrl'
      });
  });
