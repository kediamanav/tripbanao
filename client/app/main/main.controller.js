'use strict';

angular.module('tripbanaoApp')
  .controller('MainCtrl',['$scope', '$location', '$window', 'FlightDetail','HotelDetail','BookingCancel', function($scope, $location, $window, FlightDetail, HotelDetail, BookingCancel) {
    
    $scope.panel=0;

    var i,j;
    $scope.popup = [];
    for(i=0;i<2;i++){
      $scope.popup[i] = [];
      for(j=0;j<5;j++){
        $scope.popup[i][j] = {
          opened: false
        }
      }
    }

    $scope.popup3 = {
      opened: false
    };

    $scope.popup4 = {
      opened: false
    };

    $scope.open3 = function() {
      $scope.popup3.opened = true;
    };

    $scope.open4 = function() {
      $scope.popup4.opened = true;
    };

    $scope.open = function(i,j) {
      $scope.popup[i][j].opened = true;
      console.log($scope.popup[i][j]);
    };

    $scope.flight = [];
    $scope.flight_type = 1;

    $scope.hotel = {};
    $scope.hotel.count=1;
    $scope.hotel.nights=1;
    $scope.hotel.rooms=1;

    $scope.cityCount =1 ;
    $scope.roomCount =1 ;

    $scope.increaseCity = function(){
      $scope.cityCount = $scope.cityCount + 1;
    };

    $scope.increaseRoom = function(){
      $scope.roomCount = $scope.roomCount + 1;
    };

    $scope.getNumber = function(num) {
        return new Array(num);   
    };

    $scope.searchFlights = function(){

      //console.log($scope.flight);
      if($scope.flight[0].return_date){

        $scope.flight.push({
          "to": $scope.flight[0].from,
          "from": $scope.flight[0].to,
          "count": $scope.flight[0].count,
          "date": $scope.flight[0].return_date
        });
      }

      console.log("Inside searchFlights");

      console.log($scope.flight);
      FlightDetail.resetFlight();
      
      for(var i=0;i<$scope.flight.length;i++){
        FlightDetail.putFlight($scope.flight[i]); 
      }

      $location.path("/flights");
    };

    $scope.cancelBooking = function(){
      var temp = {
        "id": $scope.bookingid
      }
      BookingCancel.cancel(temp, function success(value){
        console.log("Booking cancelled");
        $window.alert("Booking succesfully cancelled")
      });
    };

    $scope.searchHotels = function(){

      console.log($scope.hotel);
      HotelDetail.putHotel($scope.hotel);

      $location.path("/hotels");
    };

    $scope.changeTab =  function(){
      $scope.panel = 1- $scope.panel;
    }
    
  }]);