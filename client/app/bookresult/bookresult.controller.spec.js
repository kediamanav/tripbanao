'use strict';

describe('Controller: BookresultCtrl', function () {

  // load the controller's module
  beforeEach(module('tripbanaoApp'));

  var BookresultCtrl, scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    BookresultCtrl = $controller('BookresultCtrl', {
      $scope: scope
    });
  }));

  it('should ...', function () {
    expect(1).toEqual(1);
  });
});
