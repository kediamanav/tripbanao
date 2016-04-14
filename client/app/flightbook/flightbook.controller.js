'use strict';

angular.module('tripbanaoApp')
  .controller('FlightbookCtrl',['$scope', '$location', '$window', 'FlightPay', 'FlightBook', 'FlightDetail', function ($scope, $location, $window, FlightPay, FlightBook, FlightDetail) {
    
  	$scope.loading =true;
  	$scope.text = "Loading...";

    $scope.fl = FlightDetail.getFlight();
    console.log($scope.fl);

    FlightBook.book($scope.fl, function success(value){
    	//value==true;
        if(value==true){
        	console.log("Go ahead with the booking");
        	$scope.loading = false;
        }
        else{
        	console.log("Cannot book");
  			$scope.text = "Sorry, the seats have been taken, Please go back and select another flight";
        }
    });

    $scope.payFlight = function(data){
        console.log(data);

        FlightPay.book($scope.fl, function success(value){
        	console.log(value);
	    });
    };
  }]);
