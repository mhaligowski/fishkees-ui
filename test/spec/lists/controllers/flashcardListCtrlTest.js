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
    });


    it('should show remove list modal', function() {
        // when
        $scope.showRemoveListModal({ id: 1 });
    
        // then
        deferred.resolve('someThing');
        $scope.$digest();
        
        expect(mockService.removeFromLists).toHaveBeenCalledWith($scope.lists, 'someThing');
    });

    it('should call opening the show edit modal button', function() {
        // when
        $scope.showEditListModal({ id: 1 });
    
        // then
        // then
        deferred.resolve('someThing');
        $scope.$digest();
        
        expect(mockService.updateLists).toHaveBeenCalledWith($scope.lists, 'someThing');
    });
});
