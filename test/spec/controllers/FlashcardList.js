'use strict';

describe('Controller: FlashcardlistCtrl', function () {

  // load the controller's module
  beforeEach(module('fishkeesUiApp.flascardList'));

  var FlashcardlistCtrl,
    scope,
    $httpBackend,
    mockModal,
    mockModalResult;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$httpBackend_, $controller, $rootScope) {
    // mock http backend
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
    $httpBackend.whenPOST('flashcardlists').respond('');

    // mock $modal
    mockModal = {
      open: function() {}
    };

    mockModalResult =  {
      result: { then: function() {} }
    }
    
    spyOn(mockModal, 'open').andReturn(mockModalResult);
    spyOn(mockModalResult.result, 'then');

    // mock scope
    scope = $rootScope.$new();

    // mock controller
    FlashcardlistCtrl = $controller('FlashcardlistCtrl', {
      $scope: scope,
      $modal: mockModal,
    });
  }));

  it('should show two lists', function () {
    expect(scope.lists).toEqual([]);
    $httpBackend.flush();

    expect(scope.lists.length).toEqual(2);
  });

  it('should add new list', function() {
    // given
    $httpBackend.flush();
    expect(scope.lists.length).toEqual(2);

    // when
    scope.createNewList({
      'title': 'MockList',
      'create_date': 12345
    });

    // then
    expect(scope.lists.length).toEqual(3);

  });

  it('it should show modal', function() {
    // when
    scope.showModal();
    
    // then
    expect(mockModal.open).toHaveBeenCalledWith({
      templateUrl: 'addNewListModal.html',
      controller: 'AddNewListModalInstanceCtrl',
      windowClass: 'add-new-list-modal'
    });
    expect(mockModalResult.result.then).toHaveBeenCalled();
  });
});
