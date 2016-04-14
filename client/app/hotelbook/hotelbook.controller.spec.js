'use strict';

describe('Controller: HotelbookCtrl', function () {

  // load the controller's module
  beforeEach(module('tripbanaoApp'));

  var HotelbookCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    HotelbookCtrl = $controller('HotelbookCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
