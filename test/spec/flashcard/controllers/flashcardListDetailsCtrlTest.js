'use strict'

describe('FlashcardListDetailsCtrl controller', function() {
   
    var FlashcardListDetailsCtrl,
        mockService,
        mockParams,
        $scope;

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

        // mock params
        mockParams = { id: "someNiceId1" };

        module(function ($provide) {
            $provide.value('flashcardListDetailsService', mockService);
        });

        inject(function ($controller, $rootScope) {
            $scope = $rootScope.$new();

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
});