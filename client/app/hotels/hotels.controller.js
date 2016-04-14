'use strict';

angular.module('tripbanaoApp')
  .controller('HotelsCtrl', ['$scope','Travel','HotelDetail', function ($scope, Travel, HotelDetail) {

    $scope.loading =true;

  	$scope.ht = HotelDetail.getHotel();
    console.log($scope.ht);

    Travel.update({type:2} , $scope.ht, function success(value){
        $scope.loading = false;
        $scope.hotels = value;
        console.log("Done successfully");
        console.log(value);
    });

  }]);
