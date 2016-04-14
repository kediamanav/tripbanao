'use strict';

describe('Controller: FlightbookCtrl', function () {

  // load the controller's module
  beforeEach(module('tripbanaoApp'));

  var FlightbookCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FlightbookCtrl = $controller('FlightbookCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
