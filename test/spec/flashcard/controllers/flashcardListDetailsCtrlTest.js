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
        deferredCreate,
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
            [
                'getListDetails', 
                'getFlashcards', 
                'removeFlashcardFromList', 
                'updateFlashcard',
                'createNewFlashcard'
            ]);
        mockService.getListDetails.andCallFake(function() { return testList; });
        mockService.getFlashcards.andCallFake(function() { return testFlashcards; });
        
        // mock modal
        mockModal = jasmine.createSpyObj('$modal', ['open']);

        inject(function ($controller, $rootScope, _$q_) {
            $scope = $rootScope.$new();
            $q = _$q_;
            deferredModal = $q.defer();
            deferredRemoving = $q.defer();
            deferredCreate = $q.defer();

            mockModal.open.andCallFake(function() { 
                return { result: deferredModal.promise };
            });

            mockService.removeFlashcardFromList.andCallFake(function() {
                return deferredRemoving.promise;
            });

            mockService.createNewFlashcard.andCallFake(function() { 
                return deferredCreate.promise; 
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

    it('should pass the appropriate list to the modal', function() {
        // given
        var argument = { id: 'someId' };

        // when
        $scope.showRemoveFlashcardModal(argument);

        // then
        var callObject = mockModal.open.mostRecentCall.args[0];
        expect(callObject.resolve.modalObject()).toEqual(argument);
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

    it('should call the update service when updating the front', function() {
        // given
        var flashcard = {};
        var newValue = 'new front';

        // when
        $scope.updateFlashcardFront(flashcard, newValue);

        // then
        expect(flashcard.front).toBe(newValue);
        expect(mockService.updateFlashcard).toHaveBeenCalledWith(flashcard);        
    });

    it('should call the update service when updating the back', function() {
        // given
        var flashcard = {};
        var newValue = 'new back';

        // when
        $scope.updateFlashcardBack(flashcard, newValue);

        // then
        expect(flashcard.back).toBe(newValue);
        expect(mockService.updateFlashcard).toHaveBeenCalledWith(flashcard);        
    });

    it('should add new empty flashcard at the beginning', function() {
        // given
        var expectedLength = testFlashcards.length + 1;

        // when
        $scope.addNewFlashcardAtTop();
        var result = {}
        deferredCreate.resolve(result);
        $scope.$digest();

        // then
        expect($scope.flashcards.length).toBe(expectedLength);
        expect($scope.flashcards[0]).toBe(result);
        expect($scope.flashcards[0].isNew).not.toBeUndefined();
        expect(mockService.createNewFlashcard).toHaveBeenCalled();
    });

});