'use strict';

angular.module('tripbanaoApp')
  .controller('FlightsCtrl',['$scope', 'Travel', 'FlightDetail', function ($scope, Travel, FlightDetail) {

    $scope.loading =true;

    /*$scope.flights = [{
    		"name":"emirates",
    		"from":"kolkata",
    		"to":"chicago",
    		"from_date": "8 aug, 20:30",
    		"to_date": "9 aug, 15:30",
    		"price": "47339",
    		"duration": "29 hrs"
    	},{
    		"name":"air india",
    		"from":"kolkata",
    		"to":"chicago",
            "from_date": "8 aug, 20:30",
            "to_date": "9 aug, 15:30",
    		"price": "41339",
    		"duration": "24 hrs"
    	},{
    		"name":"ethiad",
    		"from":"kolkata",
    		"to":"chicago",
            "from_date": "8 aug, 20:30",
            "to_date": "9 aug, 15:30",
    		"price": "45339",
    		"duration": "32 hrs"
    	},
    ];*/

    $scope.fl = FlightDetail.getFlight();
    console.log($scope.fl);

    Travel.update({type:1} , $scope.fl, function success(value){
        $scope.loading = false;
        $scope.flights = value;
        console.log("Done successfully");
        console.log(value);
    });

  }]);
