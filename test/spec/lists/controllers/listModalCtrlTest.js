'use strict'

describe('Controller: RemoveListModalInstanceCtrl', function () {

  // load the controller's module
  beforeEach(module('flashcardListModule.modals'));

  var ListModalCtrl,
    scope,
    mockModalInstance,
    list;

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

    list = {
      id: 1
    };

    // mock controller
    ListModalCtrl = $controller('ListModalCtrl', {
      $scope: scope,
      $modalInstance: mockModalInstance,
      list: list
    });
  }));

  it('should contain the same list after create', function() {
    expect(scope.list).toEqual({
      id: 1
    });

    expect(scope.list).not.toEqual({
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
    scope.ok();

    expect(mockModalInstance.close).toHaveBeenCalledWith(scope.list);
  });
});
