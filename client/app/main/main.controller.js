'use strict';

angular.module('tripbanaoApp')
  .controller('MainCtrl',['$scope', 'Hotels', 'Flights', function($scope, Hotels, Flights) {
    $scope.awesomeThings = [];

    $scope.popup1 = {
      opened: false
    };

    $scope.popup2 = {
      opened: false
    };

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
      $scope.popup2.opened = true;
    };

    $scope.flight = {};
    $scope.flight.count=1;

    $scope.cityCount =0 ;

    $scope.increaseCity = function(){
      $scope.cityCount = $scope.cityCount + 1;
    };

    $scope.searchFlights = function(){
      Flights.query();
    }
  }]);