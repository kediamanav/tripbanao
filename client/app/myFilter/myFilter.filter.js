'use strict';

angular.module('tripbanaoApp')
  .filter('myFilter', function () {
    return function (input) {
      var x = new Date(input);
      return x;
    };
  });
