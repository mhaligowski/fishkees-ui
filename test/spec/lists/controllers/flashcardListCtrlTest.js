'use strict';

describe('Controller: FlashcardListCtrl', function () {

  // load the controller's module
  beforeEach(module('flashcardListModule.controllers'));

  var FlashcardListCtrl,
    scope,
    mockModal,
    mockModalInstance,
    mockListsEditService;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    // mock $modal
    mockModal = {
      open: function() {}
    };

    mockModalInstance =  {
      result: { then: function() { }}
    }
    
    spyOn(mockModal, 'open').andReturn(mockModalInstance);
    spyOn(mockModalInstance.result, 'then');

    // mock listEditService
    mockListsEditService = {
      getLists: function() {
        return [{
            "id": 1,
            "title": "Spanish for beginners",
            "create_date": 1379617022000
        },
        {
            "id": 2,
            "title": "Russian for intermediate",
            "create_date": 1339347167000
        }];
      },
      addToLists: function(lists, newList) {},
      removeFromLists: function(lists, toRemove) {},
      updateLists: function(lists, toUpdate) {}
    };

    // mock scope
    scope = $rootScope.$new();

    // mock controller
    FlashcardListCtrl = $controller('FlashcardListCtrl', {
      $scope: scope,
      $modal: mockModal,
      listsEditService: mockListsEditService
    });
  }));

  it('should show two lists after start', function () {
    expect(scope.lists.length).toEqual(2);
  });

  it('should show add new list modal', function() {
    // when
    scope.showAddNewListModal();
    
    // then
    expect(mockModal.open).toHaveBeenCalledWith({
      templateUrl: 'views/addNewListModal.html',
      controller: 'ListModalCtrl',
      windowClass: 'add-new-list-modal',
      resolve: {
        list: jasmine.any(Function)
      }

    });
    expect(mockModalInstance.result.then).toHaveBeenCalled();
  });


  it('should show remove list modal', function() {
    // when
    scope.showRemoveListModal({ id: 1 });
    
    // then
    expect(mockModal.open).toHaveBeenCalledWith({
      templateUrl: 'views/removeListModal.html',
      controller: 'ListModalCtrl',
      windowClass: 'remove-list-modal',
      resolve: {
        list: jasmine.any(Function)
      }
    });
    expect(mockModalInstance.result.then).toHaveBeenCalled();
  });

  it('should call opening the show edit modal button', function() {
    // when
    scope.showEditListModal({ id: 1 });
    
    // then
    expect(mockModal.open).toHaveBeenCalledWith({
      templateUrl: 'views/editListModal.html',
      controller: 'ListModalCtrl',
      windowClass: 'edit-list-modal',
      resolve: {
        list: jasmine.any(Function)
      }
    });
    expect(mockModalInstance.result.then).toHaveBeenCalled();
  });


});
