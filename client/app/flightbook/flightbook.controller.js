'use strict';

angular.module('tripbanaoApp')
  .controller('FlightbookCtrl',['$scope', '$location', 'FlightBook', 'FlightDetail', 'BookingDetail', '$timeout', '$window', 'FlightRelease', function ($scope, $location, FlightBook, FlightDetail, BookingDetail, $timeout, $window, FlightRelease) {
    
  	$scope.loading =true;
  	$scope.text = "Loading...";

    $scope.fl = FlightDetail.getFlight();
    console.log($scope.fl);

    $scope.user = {};
    $scope.timer = 10;

    $scope.temp = [$scope.fl];

    FlightBook.book($scope.temp, function success(value){
    	//value==true;
        if(value.result==true){
        	console.log("Go ahead with the booking");
        	$scope.loading = false;
        	$scope.user.id = value.id;
        }
        else{
        	console.log("Cannot book");
  			$scope.text = "Sorry, the seats have been taken, Please go back and select another flight";
        }
    });

    var stop = $timeout(function() {
        if ($scope.timer > 0) {
        	$scope.timer = $scope.timer-1;
        } else {
          $scope.stopTime();
        }
      }, 1000);

    $scope.stopTime = function() {
      if (angular.isDefined(stop)) {
        $timeout.cancel(stop);
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
	        $timeout.cancel(stop);
	        stop = undefined;
	    }
    }

    $scope.payFlight = function(){
        FlightDetail.putFlight($scope.fl);
        BookingDetail.putUser($scope.user);
        $location.path("/bookresult");
    };

    $scope.$on('$destroy', function() {
      // Make sure that the interval is destroyed too
      $scope.destroyTimer();
    });
  }]);
