'use strict';

describe('Controller: FlashcardlistCtrl', function () {

  // load the controller's module
  beforeEach(module('fishkeesUiApp.flascardList'));

  var FlashcardlistCtrl,
    scope,
    $httpBackend;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    $httpBackend = _$httpBackend_;
    $httpBackend.expectGET('flashcardlists').respond([
        {
            'id': 1,
            'title': 'Spanish for beginners',
            'create_date': new Date(1379617022 * 1000)
        },
        {
            'id': 2,
            'title': 'Russian for intermediate',
            'create_date': new Date(1329617167 * 1000)
        },

    ]);

    scope = $rootScope.$new();
    FlashcardlistCtrl = $controller('FlashcardlistCtrl', {
      $scope: scope
    });
  }));

  it('should show two lists', function () {
    expect(scope.lists).toEqual([]);
    $httpBackend.flush();

    expect(scope.lists.length).toEqual(2);
  });
});
