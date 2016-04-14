'use strict';

angular.module('tripbanaoApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/hotelbook', {
        templateUrl: 'app/hotelbook/hotelbook.html',
        controller: 'HotelbookCtrl'
      });
  });
