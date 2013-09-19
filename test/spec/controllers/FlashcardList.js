'use strict';

describe('Controller: FlashcardlistCtrl', function () {

  // load the controller's module
  beforeEach(module('fishkeesUiApp.flascardList'));

  var FlashcardlistCtrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    FlashcardlistCtrl = $controller('FlashcardlistCtrl', {
      $scope: scope
    });
  }));

  it('should attach a list of awesomeThings to the scope', function () {
    expect(scope.awesomeThings.length).toBe(3);
  });
});
