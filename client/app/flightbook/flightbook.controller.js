'use strict';

angular.module('tripbanaoApp')
  .controller('FlightbookCtrl',['$scope', '$location', '$interval', '$window','FlightBook', 'BookingDetail', 'UserDetail', 'FlightRelease', function ($scope, $location, $interval, $window, FlightBook, BookingDetail, UserDetail, FlightRelease) {
    
  	$scope.loading =true;
  	$scope.text = "Loading...";

    $scope.flights = BookingDetail.getFlight();
    console.log($scope.flights);

    $scope.user = {};
    $scope.timer = 10;

    FlightBook.book($scope.flights, function success(value){
    	//value==true;
        console.log(value);
        if(value.result==true){
        	console.log("Go ahead with the booking");
        	$scope.loading = false;
        	$scope.user.id = value.id;
        }
        else{
        	console.log("Cannot book");
          $scope.loading = false;
  			  $scope.text = "Sorry, the seats have been taken, Please go back and select another flight";
        }
    });

    var stop = $interval(function() {
        if ($scope.timer > 0) {
        	$scope.timer = $scope.timer-1;
        } else {
          $scope.stopTime();
        }
      }, 1000);

    $scope.stopTime = function() {
      if (angular.isDefined(stop)) {
        $interval.cancel(stop);
        stop = undefined;

        FlightRelease.release($scope.user);

        if($window.confirm("Time expired. Please try again"))
        	$location.path("/");
        else
        	$location.path("/");
      }
    };

    $scope.destroyTimer = function(){
    	if (angular.isDefined(stop)) {
	        $interval.cancel(stop);
	        stop = undefined;
	    }
    }

    $scope.payFlight = function(){
        UserDetail.putUser($scope.user);
        $scope.destroyTimer();
        $location.path("/bookresult");
    };

    $scope.$on('$destroy', function() {
      // Make sure that the interval is destroyed too
      $scope.destroyTimer();
    });
  }]);
