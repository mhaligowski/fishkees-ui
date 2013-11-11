'use strict'

describe('FlashcardListDetailsCtrl controller', function() {
   
    var FlashcardListDetailsCtrl,
        mockModal,
        mockService,
        mockParams,
        $scope,
        $q,
        deferred;

    beforeEach(function() {
        var testList = {
                "id": "someNiceId1",
                "title": "Spanish for beginners",
                "create_date": 1379617022000
            };
        module('flashcardModule');

        var testFlashcards = [
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
            ['getListDetails', 'getFlashcards']);
        mockService.getListDetails.andCallFake(function() { return testList; });
        mockService.getFlashcards.andCallFake(function() { return testFlashcards; });

        // mock modal
        mockModal = jasmine.createSpyObj('$modal', ['open']);

        // mock params
        mockParams = { id: "someNiceId1" };

        module(function ($provide) {
            $provide.value('flashcardListDetailsService', mockService);
            $provide.value('$modal', mockModal);
        });

        inject(function ($controller, $rootScope, _$q_) {
            $scope = $rootScope.$new();
            $q = _$q_;

            mockModal.open.andCallFake(function() { 
                deferred = $q.defer(); 
                return { result: deferred.promise };
            });

            FlashcardListDetailsCtrl = $controller('FlashcardListDetailsCtrl', {
                $scope: $scope,
                $routeParams: mockParams
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
});