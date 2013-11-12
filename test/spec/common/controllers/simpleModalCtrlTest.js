'use strict'

describe('Modal controller', function () {

  // load the controller's module
  beforeEach(module('commonModule.controllers'));

  var SimpleModalCtrl,
    scope,
    mockModalInstance,
    modalObject;

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

    modalObject = {
      id: 1
    };

    // mock controller
    SimpleModalCtrl = $controller('SimpleModalCtrl', {
      $scope: scope,
      $modalInstance: mockModalInstance,
      modalObject: modalObject
    });
  }));

  it('should contain the same modalObject after create', function() {
    expect(scope.modalObject).toEqual({
      id: 1
    });

    expect(scope.modalObject).not.toEqual({
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

    expect(mockModalInstance.close).toHaveBeenCalledWith(scope.modalObject);
  });
});
