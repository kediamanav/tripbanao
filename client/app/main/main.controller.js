'use strict';

angular.module('tripbanaoApp')
  .controller('MainCtrl',['$scope', 'Travel', function($scope, Travel) {
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
      console.log($scope.flight);
      Travel.update({type:1} , $scope.flight, function success(value){
        console.log("Done successfully");
        console.log(value);
      });
    }
  }]);