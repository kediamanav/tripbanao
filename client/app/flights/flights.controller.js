'use strict';

angular.module('tripbanaoApp')
  .controller('FlightsCtrl',['$scope', 'Flights', function ($scope, Flights) {
    $scope.flights = [{
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
    ]
  }]);
