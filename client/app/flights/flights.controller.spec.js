'use strict';

describe('Controller: FlightsCtrl', function () {

  // load the controller's module
  beforeEach(module('tripbanaoApp'));

  var FlightsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FlightsCtrl = $controller('FlightsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
