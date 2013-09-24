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

  it('should show two lists after start', function () {
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

  it('it should show add new list modal', function() {
    // when
    scope.showAddNewListModal();
    
    // then
    expect(mockModal.open).toHaveBeenCalledWith({
      templateUrl: 'views/addNewListModal.html',
      controller: 'AddNewListModalInstanceCtrl',
      windowClass: 'add-new-list-modal'
    });
    expect(mockModalResult.result.then).toHaveBeenCalled();
  });

  it('it should remove the list', function() {
    // given
    scope.lists = [
        {
            'id': 1,
            'title': 'Spanish for beginners',
            'create_date': 1379617022000
        },
        {
            'id': 2,
            'title': 'Russian for intermediate',
            'create_date': 1339347167000
        },
        {
            'id': 3,
            'title': 'Something completely different',
            'create_date': 1339347167000
        }
    ];
    expect(scope.lists.length).toBe(3);

    // when
    scope.removeList({
        'id': 2,
        'title': 'Russian for intermediate',
        'create_date': 1339347167000
    });


    // then
    expect(scope.lists.length).toBe(2);
    expect(scope.lists[0].id).toBe(1);
    expect(scope.lists[1].id).toBe(3);
  });

  it('it should show remove list modal', function() {
    // when
    scope.showRemoveListModal({ id: 1 });
    
    // then
    expect(mockModal.open).toHaveBeenCalledWith({
      templateUrl: 'views/removeListModal.html',
      controller: 'RemoveListModalInstanceCtrl',
      windowClass: 'remove-list-modal',
      resolve: {
        list: jasmine.any(Function)
      }
    });
    expect(mockModalResult.result.then).toHaveBeenCalled();
  });


});
