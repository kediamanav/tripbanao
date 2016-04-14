'use strict';

angular.module('tripbanaoApp')
  .controller('BookresultCtrl', ['$scope', 'FlightPay', 'FlightDetail','BookingDetail', function ($scope, FlightPay, FlightDetail, BookingDetail) {
    
  	$scope.text = "";

    $scope.flight = FlightDetail.getFlight();
    $scope.user = BookingDetail.getUser();

    FlightPay.pay($scope.user, function success(value){
    	//value==true;
        if(value.result==true){
        	console.log("Booking Successful");
        	$scope.text = "Dear " + $scope.user.name +", your booking has been successful. Your booking id is : "+value.id;
        }
        else{
        	console.log("Cannot book");
  			$scope.text = "Sorry "+$scope.user.name+", timeout occured. Please try again.";
        }
    });
    
  }]);
