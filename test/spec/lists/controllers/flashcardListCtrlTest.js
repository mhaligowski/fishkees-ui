'use strict';

describe('Controller: FlashcardListCtrl', function () {
    // Initialize the controller and a mock scope
    var FlashcardListCtrl,
        $scope,
        $q,
        modalMock,
        mockService,
        testList,
        deferred;

    // load the controller's module
    beforeEach(function() {
        testList = [
            {
                "id": "someNiceId1",
                "title": "Spanish for beginners",
                "create_date": 1379617022000
            },
            {
                "id": "someNiceId2",
                "title": "Russian for intermediate",
                "create_date": 1339347167000
            }
        ];

        modalMock = jasmine.createSpyObj('$modal', ['open']);

        mockService = jasmine.createSpyObj('listsEditService', 
            ['getLists', 'addToLists', 'removeFromLists', 'updateLists']);
        mockService.getLists.andCallFake(function() { return testList; });

        module('flashcardListModule.controllers');
        module(function ($provide) { 
            $provide.value('$modal', modalMock); 
            $provide.value('listsEditService', mockService);
        });

        inject(function ($controller, $rootScope, _$q_) {
            $scope = $rootScope.$new();
            $q = _$q_;

            modalMock.open.andCallFake(function() { 
                deferred = $q.defer(); 
                return { result: deferred.promise };
            });

            // mock controller
            FlashcardListCtrl = $controller('FlashcardListCtrl', { $scope: $scope });
        })
    });

    it('should show two lists after start', function () {
        expect($scope.lists.length).toEqual(2);
        expect(mockService.getLists).toHaveBeenCalled();
    });

    it('should show add new list modal', function() {
        // when
        $scope.showAddNewListModal();
        deferred.resolve('someThing');
        $scope.$digest();

        // then
        expect(mockService.addToLists).toHaveBeenCalledWith($scope.lists, 'someThing');

        var callObject = modalMock.open.mostRecentCall.args[0];
        expect(callObject.templateUrl).toBe('views/addNewListModal.html');
        expect(callObject.controller).toBe('ListModalCtrl');
        expect(callObject.windowClass).toBe('add-new-list-modal');
        expect(callObject.resolve.list).not.toBeUndefined();
        expect(callObject.resolve.list()).toEqual({ 'title': '' });
    });


    it('should show remove list modal', function() {
        // when
        $scope.showRemoveListModal({ id: 1 });
        deferred.resolve('someThing');
        $scope.$digest();
    
        // then
        
        expect(mockService.removeFromLists).toHaveBeenCalledWith($scope.lists, 'someThing');

        var callObject = modalMock.open.mostRecentCall.args[0];
        expect(callObject.templateUrl).toBe('views/removeListModal.html');
        expect(callObject.controller).toBe('ListModalCtrl');
        expect(callObject.windowClass).toBe('remove-list-modal');
        expect(callObject.resolve.list).not.toBeUndefined();
        expect(callObject.resolve.list()).toEqual({ id: 1 });
    });

    it('should call opening the show edit modal button', function() {
        // when
        $scope.showEditListModal({ id: 1 });
        deferred.resolve('someThing');
        $scope.$digest();
    
        // then        
        expect(mockService.updateLists).toHaveBeenCalledWith($scope.lists, 'someThing');

        var callObject = modalMock.open.mostRecentCall.args[0];
        expect(callObject.templateUrl).toBe('views/editListModal.html');
        expect(callObject.controller).toBe('ListModalCtrl');
        expect(callObject.windowClass).toBe('edit-list-modal');
        expect(callObject.resolve.list).not.toBeUndefined();
        expect(callObject.resolve.list()).toEqual({ id: 1 });
    });
});
