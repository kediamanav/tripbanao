'use strict';

angular.module('tripbanaoApp')
  .controller('NavbarCtrl', function ($scope, $location) {
    $scope.menu = [{
      'title': 'Home',
      'link': '/'
    },{
      'title': 'Flights',
      'link': '/flights'
    },{
      'title': 'Hotels',
      'link': '/hotels'
    }];

    $scope.isCollapsed = true;

    $scope.isActive = function(route) {
      return route === $location.path();
    };
  });
