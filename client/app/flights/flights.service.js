'use strict';

angular.module('tripbanaoApp')
  .factory('Flights',['$resource', function ($resource) {

    return $resource('/api/flights/',null,{
      'update': {method: 'PUT'}
    });
  }]);
