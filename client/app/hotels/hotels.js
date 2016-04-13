'use strict';

angular.module('tripbanaoApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/hotels', {
        templateUrl: 'app/hotels/hotels.html',
        controller: 'HotelsCtrl'
      });
  });
