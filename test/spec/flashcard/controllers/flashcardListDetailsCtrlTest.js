'use strict'

describe('FlashcardListDetailsCtrl controller', function() {
   
    var FlashcardListDetailsCtrl,
        mockModal,
        mockService,
        mockParams,
        $scope,
        $q,
        deferredModal,
        deferredRemoving,
        testFlashcards;

    beforeEach(function() {
        var testList = {
                "id": "someNiceId1",
                "title": "Spanish for beginners",
                "create_date": 1379617022000
            };
        module('flashcardModule');

        testFlashcards = [
            {
                id: "someId1",
                flashcard_list_id: "someNiceId1",
                front: "front 1",
                back: "back 1",
                create_date: 520603200000
            },
            {
                id: "someId2",
                flashcard_list_id: "someNiceId1",
                front: "front 2",
                back: "back 2",
                create_date: 520603200000
            },
            {
                id: "someId3",
                flashcard_list_id: "someNiceId1",
                front: "front 3",
                back: "back 3",
                create_date: 520603200000
            }];

        // mock service
        mockService = jasmine.createSpyObj('flashcardListDetailsService', 
            ['getListDetails', 'getFlashcards', 'removeFlashcardFromList']);
        mockService.getListDetails.andCallFake(function() { return testList; });
        mockService.getFlashcards.andCallFake(function() { return testFlashcards; });
        
        // mock modal
        mockModal = jasmine.createSpyObj('$modal', ['open']);

        inject(function ($controller, $rootScope, _$q_) {
            $scope = $rootScope.$new();
            $q = _$q_;
            deferredModal = $q.defer();
            deferredRemoving = $q.defer();

            mockModal.open.andCallFake(function() { 
                return { result: deferredModal.promise };
            });

            mockService.removeFlashcardFromList.andCallFake(function() {
                return deferredRemoving.promise;
            });

            FlashcardListDetailsCtrl = $controller('FlashcardListDetailsCtrl', {
                $scope: $scope,
                $routeParams: { id: "someNiceId1" },
                $modal: mockModal,
                flashcardListDetailsService: mockService
            });
        });
    });

    it('should give the title from the flashcardListResource', function() {
        expect($scope.list.title).toBe("Spanish for beginners");
        expect(mockService.getListDetails).toHaveBeenCalledWith("someNiceId1");
    });

    it('should load the flashcards at the startup', function() {
        expect($scope.flashcards.length).toBe(3);
        expect(mockService.getFlashcards).toHaveBeenCalledWith("someNiceId1");
    });

    it('should open the modal', function() {
        // when
        $scope.showRemoveFlashcardModal({ id: 'someId3' });

        // then
        expect(mockModal.open).toHaveBeenCalled();
    });

    it('should call removing the modal', function() {
        // given
        var result = [
            {
                id: "someId1",
                flashcard_list_id: "someNiceId1",
                front: "front 1",
                back: "back 1",
                create_date: 520603200000
            },
            {
                id: "someId3",
                flashcard_list_id: "someNiceId1",
                front: "front 3",
                back: "back 3",
                create_date: 520603200000
            }];

        // when
        $scope.showRemoveFlashcardModal({ id: 'someId3 '});
        deferredModal.resolve({ id: 'someId3 '});
        deferredRemoving.resolve(result);
        $scope.$digest();

        // then
        expect(mockModal.open).toHaveBeenCalled();
        expect(mockService.removeFlashcardFromList).toHaveBeenCalledWith({ id: 'someId3 '}, testFlashcards);
        expect($scope.flashcards).toBe(result);
    });
});