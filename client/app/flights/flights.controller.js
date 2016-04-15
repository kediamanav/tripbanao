 'use strict';

angular.module('tripbanaoApp')
  .controller('FlightsCtrl',['$scope', '$location', 'Travel', 'FlightDetail', 'BookingDetail', function ($scope, $location, Travel, FlightDetail, BookingDetail) {

    $scope.loading =true;

    $scope.fl = FlightDetail.getFlight();
    console.log("Before Pramesh function");
    console.log($scope.fl);

    $scope.booked = 0;
    $scope.curFlights = [];

    $scope.flights = [];

    Travel.update($scope.fl, function success(value){  
        console.log("After Pramesh function");
        console.log($scope.fl);

        $scope.loading = false;
        console.log("Done successfully");

        $scope.flights = value;
        
        var temp = Object.keys(value[$scope.booked]);
        console.log(temp);
        for(var j=0;j<temp.length; j++){
            for(var k=0;k<value[$scope.booked][temp[j]].length; k++){
                console.log(value[$scope.booked][temp[j]][k]);
                $scope.curFlights.push(value[$scope.booked][temp[j]][k]);
            }
        }
    });

    $scope.bookFlight = function(data){
        console.log("Inside bookFlight()" + data);
        data["seatsAvailed"] = $scope.fl[0].count;
        BookingDetail.putFlight(data);

        $scope.booked = $scope.booked +1;

        
        if($scope.booked==$scope.flights.length)
            $location.path("/flightbook");

        $scope.curFlights = [];
        var temp = Object.keys($scope.flights[$scope.booked]);
        console.log(temp);
        for(var j=0;j<temp.length; j++){
            for(var k=0;k<$scope.flights[$scope.booked][temp[j]].length; k++){
                console.log($scope.flights[$scope.booked][temp[j]][k]);
                $scope.curFlights.push($scope.flights[$scope.booked][temp[j]][k]);
            }
        }
    };
}]);
