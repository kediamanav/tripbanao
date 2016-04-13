'use strict';

describe('Controller: HotelsCtrl', function () {

  // load the controller's module
  beforeEach(module('tripbanaoApp'));

  var HotelsCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HotelsCtrl = $controller('HotelsCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
