'use strict';

angular.module('tripbanaoApp')
  .controller('MainCtrl',['$scope', '$location', 'FlightDetail','HotelDetail', function($scope, $location, FlightDetail, HotelDetail) {
    $scope.awesomeThings = [];

    $scope.popup1 = {
      opened: false
    };

    $scope.popup2 = {
      opened: false
    };

    $scope.popup3 = {
      opened: false
    };

    $scope.popup4 = {
      opened: false
    };

    $scope.open1 = function() {
      $scope.popup1.opened = true;
    };

    $scope.open2 = function() {
      $scope.popup2.opened = true;
    };

    $scope.open3 = function() {
      $scope.popup3.opened = true;
    };

    $scope.open4 = function() {
      $scope.popup4.opened = true;
    };

    $scope.flight = {};
    $scope.flight.count=1;
    $scope.type = 1;

    $scope.hotel = {};
    $scope.hotel.count=1;
    $scope.hotel.nights=1;

    $scope.cityCount =0 ;
    $scope.roomCount =0 ;

    $scope.increaseCity = function(){
      $scope.cityCount = $scope.cityCount + 1;
    };

    $scope.increaseRoom = function(){
      $scope.roomCount = $scope.roomCount + 1;
    };

    $scope.searchFlights = function(){

      console.log($scope.flight);
      FlightDetail.putFlight($scope.flight);

      $location.path("/flights");
    };

    $scope.searchHotels = function(){

      console.log($scope.hotel);
      HotelDetail.putHotel($scope.hotel);

      $location.path("/hotels");
    };
    
  }]);