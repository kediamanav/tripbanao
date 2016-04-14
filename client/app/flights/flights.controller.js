'use strict';

angular.module('tripbanaoApp')
  .controller('FlightsCtrl',['$scope', '$location', 'Travel', 'FlightDetail', function ($scope, $location, Travel, FlightDetail) {

    $scope.loading =true;

    $scope.fl = FlightDetail.getFlight();
    console.log($scope.fl);

    Travel.update($scope.fl, function success(value){
        $scope.flights = [];

        $scope.loading = false;
        console.log("Done successfully");

        // $scope.flights = value;
        
        for(var i=0; i< value.length;i++){
            var temp = Object.keys(value[i]);
            console.log(temp);
            for(var j=0;j<temp.length; j++){
                for(var k=0;k<value[i][temp[j]].length; k++){
                    console.log(value[i][temp[j]][k]);
                    $scope.flights.push(value[i][temp[j]][k]);
                }
            }
        }
    });

    $scope.bookFlight = function(data){
        console.log(data);
        data["seatsAvailed"] = $scope.fl.count;
        FlightDetail.putFlight(data);
        $location.path("/flightbook");
    };

  }]);
