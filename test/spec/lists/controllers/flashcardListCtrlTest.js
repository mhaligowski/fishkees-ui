'use strict';

describe('Controller: FlashcardListCtrl', function () {

  // load the controller's module
  beforeEach(module('flashcardListModule.controllers'));

  var FlashcardListCtrl,
    scope,
    mockModal,
    mockModalResult;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
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
    FlashcardListCtrl = $controller('FlashcardListCtrl', {
      $scope: scope,
      $modal: mockModal,
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
    expect(mockModalResult.result.then).toHaveBeenCalled();
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
    expect(mockModalResult.result.then).toHaveBeenCalled();
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
    expect(mockModalResult.result.then).toHaveBeenCalled();
  });


});
