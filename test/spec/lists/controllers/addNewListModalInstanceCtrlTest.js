'use strict'

describe('Controller: addNewListModalCtrl', function () {

  // load the controller's module
  beforeEach(module('flashcardListModule.modals'));

  var AddNewListModalCtrl,
    scope,
    mockModalInstance;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    // mock $modal
    mockModalInstance =  {
      dismiss: function(action) {},
      close: function(someList) {}
    };
    
    spyOn(mockModalInstance, 'dismiss');
    spyOn(mockModalInstance, 'close');

    // mock scope
    scope = $rootScope.$new();

    // mock controller
    AddNewListModalCtrl = $controller('AddNewListModalCtrl', {
      $scope: scope,
      $modalInstance: mockModalInstance,
    });
  }));

  it('should contain empty new list', function() {
    expect(scope.newList).toEqual({
      title: ''
    });

    expect(scope.newList).not.toEqual({
      title: 'someTitle'
    });
  });

  it('should call modal closing when cancel is called', function() {
    // when
    scope.cancel();

    // then
    expect(mockModalInstance.dismiss).toHaveBeenCalledWith('cancel');
  });

  it('should call modal closing with returning argument', function() {
    scope.newList = {
        title: 'newTestList'
    };

    scope.ok();
    expect(mockModalInstance.close).toHaveBeenCalledWith(scope.newList);
  });
});
