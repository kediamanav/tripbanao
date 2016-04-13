'use strict';

angular.module('tripbanaoApp')
  .factory('Hotels',['$resource', function ($resource) {

    return $resource('/api/hotels/',null,{
      'update': {method: 'PUT'}
    });
  }]);
