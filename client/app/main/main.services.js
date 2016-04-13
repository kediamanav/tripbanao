'use strict';

angular.module('tripbanaoApp')
  .factory('Travel',['$resource', function ($resource) {

    return $resource('/api/agents/:type',null,{
      'update': {method: 'PUT'}
    });
  }]);
