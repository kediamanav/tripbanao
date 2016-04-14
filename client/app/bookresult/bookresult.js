'use strict';

angular.module('tripbanaoApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/bookresult', {
        templateUrl: 'app/bookresult/bookresult.html',
        controller: 'BookresultCtrl'
      });
  });
